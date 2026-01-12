import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendContactNotification } from "./email";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { z } from "zod";
import multer from "multer";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key', // Fallback for build time
});

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);

      // Send email notification directly
      try {
        await sendContactNotification(validatedData);

        res.status(201).json({
          success: true,
          message: "Thank you for your message! We'll get back to you within 24 hours."
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);

        res.status(500).json({
          success: false,
          message: "Failed to send your message. Please try again."
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });



  // PDF Conversion endpoint
  app.post("/api/convert-pdf", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      const dataBuffer = req.file.buffer;

      // pdf-parse v1.x - import from lib directly to avoid debug mode
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const data = await pdfParse(dataBuffer);
      const markdown = data.text;

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("PDF conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert PDF",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // HTML to Markdown Conversion endpoint
  app.post("/api/convert-html", upload.single("file"), async (req, res) => {
    try {
      let htmlContent = '';

      if (req.file) {
        htmlContent = req.file.buffer.toString('utf-8');
      } else if (req.body && req.body.html) {
        htmlContent = req.body.html;
      } else {
        return res.status(400).json({
          success: false,
          message: 'HTML content or file is required'
        });
      }

      if (!req.file && htmlContent.length > 500000) { // 500KB limit for text
        return res.status(400).json({
          success: false,
          message: 'HTML content exceeds 500KB limit'
        });
      }

      // Convert HTML to Markdown using turndown
      const TurndownService = (await import('turndown')).default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });
      const markdown = turndownService.turndown(htmlContent);

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("HTML conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert HTML",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/convert-xml", upload.single('file'), async (req, res) => {
    try {
      let xmlContent = '';

      if (req.file) {
        xmlContent = req.file.buffer.toString('utf-8');
      } else {
        const { xml } = req.body;
        if (!xml) {
          return res.status(400).json({
            success: false,
            message: "XML content is required"
          });
        }
        xmlContent = xml;
      }

      if (xmlContent.length > 500000 && !req.file) {
        return res.status(400).json({
          success: false,
          message: 'XML content exceeds 500KB limit'
        });
      }

      // Convert XML to Markdown using turndown
      const TurndownService = (await import('turndown')).default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });
      const markdown = turndownService.turndown(xmlContent);

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("XML conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert XML",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/convert-json", upload.single('file'), async (req, res) => {
    try {
      let jsonContent = '';

      if (req.file) {
        jsonContent = req.file.buffer.toString('utf-8');
      } else {
        const { json } = req.body;
        if (!json) {
          return res.status(400).json({
            success: false,
            message: "JSON content is required"
          });
        }
        jsonContent = json;
      }

      if (jsonContent.length > 500000 && !req.file) {
        return res.status(400).json({
          success: false,
          message: 'JSON content exceeds 500KB limit'
        });
      }

      // Parse and Convert JSON to Markdown
      let parsed: any;
      try {
        parsed = JSON.parse(jsonContent);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid JSON format'
        });
      }

      let markdown = '';

      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
        // Convert Array of Objects to Table
        const keys = Array.from(new Set(parsed.flatMap((item: any) =>
          (typeof item === 'object' && item !== null) ? Object.keys(item) : []
        )));

        if (keys.length > 0) {
          markdown += '| ' + keys.join(' | ') + ' |\n';
          markdown += '| ' + keys.map(() => '---').join(' | ') + ' |\n';
          parsed.forEach((item: any) => {
            const row = keys.map(k => {
              const val = item?.[k];
              if (val === null || val === undefined) return '';
              if (typeof val === 'object') return JSON.stringify(val);
              return String(val).replace(/\|/g, '\\|');
            });
            markdown += '| ' + row.join(' | ') + ' |\n';
          });
        } else {
          markdown = '```json\n' + JSON.stringify(parsed, null, 2) + '\n```';
        }
      } else {
        // Logic for Objects or Mixed Content -> Nested List
        const toMarkdown = (obj: any, depth = 0): string => {
          const indent = '  '.repeat(depth);
          let res = '';

          if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
              if (typeof item === 'object' && item !== null) {
                res += `${indent}- Item ${index + 1}:\n${toMarkdown(item, depth + 1)}`;
              } else {
                res += `${indent}- ${item}\n`;
              }
            });
          } else if (typeof obj === 'object' && obj !== null) {
            for (const [key, val] of Object.entries(obj)) {
              res += `${indent}- **${key}**: `;
              if (typeof val === 'object' && val !== null) {
                res += `\n${toMarkdown(val, depth + 1)}`;
              } else {
                res += `${val}\n`;
              }
            }
          } else {
            res += `${indent}${obj}\n`;
          }
          return res;
        };
        markdown = toMarkdown(parsed);
      }

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("JSON conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert JSON",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/convert-rtf", upload.single('file'), async (req, res) => {
    try {
      let rtfContent = '';

      if (req.file) {
        rtfContent = req.file.buffer.toString('utf-8');
      } else {
        const { rtf } = req.body;
        if (!rtf) {
          return res.status(400).json({
            success: false,
            message: "RTF content is required"
          });
        }
        rtfContent = rtf;
      }

      if (rtfContent.length > 2 * 1024 * 1024 && !req.file) {
        return res.status(400).json({
          success: false,
          message: 'RTF content exceeds 2MB limit'
        });
      }

      // Convert RTF to HTML first
      const rtfToHTML = await import('@iarna/rtf-to-html');
      // Handle ESM/CommonJS import structure
      // @ts-ignore
      const fromString = rtfToHTML.fromString || rtfToHTML.default?.fromString || rtfToHTML.default;

      if (typeof fromString !== 'function') {
        throw new Error("Failed to load RTF converter");
      }

      const html = await new Promise<string>((resolve, reject) => {
        fromString(rtfContent, (err: any, html: string) => {
          if (err) reject(err);
          else resolve(html);
        });
      });

      // Convert HTML to Markdown using turndown
      const TurndownService = (await import('turndown')).default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });
      const markdown = turndownService.turndown(html);

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("RTF conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert RTF",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/convert-url", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "URL is required"
        });
      }

      // Basic URL validation
      try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          return res.status(400).json({
            success: false,
            message: "Only http and https protocols are supported"
          });
        }
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Invalid URL provided"
        });
      }

      // Fetch the URL content
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(400).json({
          success: false,
          message: `Failed to fetch URL: ${response.statusText}`
        });
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        return res.status(400).json({
          success: false,
          message: "URL must point to an HTML page"
        });
      }

      const htmlContent = await response.text();

      // Convert HTML to Markdown using turndown
      const TurndownService = (await import('turndown')).default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });

      // Optional: Clean up HTML using jsdom if needed, but simple fetches often work OK directly
      // For better results we could remove scripts/styles, but let's stick to simple implementation first.
      // Turndown by default ignores script and style tags.

      const markdown = turndownService.turndown(htmlContent);

      res.json({ success: true, markdown });
    } catch (error) {
      console.error("URL conversion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to convert URL",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/validate-sitemap", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "URL is required"
        });
      }

      // Basic URL validation
      try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          return res.status(400).json({
            success: false,
            message: "Only http and https protocols are supported"
          });
        }
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Invalid URL provided"
        });
      }

      // Fetch the URL content
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(400).json({
          success: false,
          message: `Failed to fetch URL: ${response.statusText}`
        });
      }

      const xmlContent = await response.text();

      // Parse XML
      const jsdom = (await import("jsdom")).default;
      const { JSDOM } = jsdom;
      const dom = new JSDOM(xmlContent, { contentType: "text/xml" });
      const doc = dom.window.document;

      const errors: string[] = [];
      let urlCount = 0;
      let valid = true;

      const urlset = doc.querySelector("urlset");
      const sitemapindex = doc.querySelector("sitemapindex");

      if (!urlset && !sitemapindex) {
        errors.push("Root element must be <urlset> or <sitemapindex>");
        valid = false;
      }

      if (urlset) {
        const urls = doc.querySelectorAll("url");
        urlCount = urls.length;
        if (urlCount === 0) {
          errors.push("No <url> elements found in <urlset>");
          valid = false; // Is empty valid? Probably warn at least.
        }
      } else if (sitemapindex) {
        const sitemaps = doc.querySelectorAll("sitemap");
        urlCount = sitemaps.length;
        if (urlCount === 0) {
          errors.push("No <sitemap> elements found in <sitemapindex>");
          valid = false;
        }
      }

      // Basic syntax check implied by parsing, but we can check for parse errors if JSDOM exposes them 
      // JSDOM's parsing is usually lenient. We rely on the structure check above.

      if (doc.querySelector("parsererror")) {
        errors.push("XML parsing error. content is not valid XML.");
        valid = false;
      }

      res.json({ success: true, valid, urlCount, errors });

    } catch (error) {
      console.error("Sitemap validation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to validate sitemap",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.post("/api/generate-sitemap", async (req, res) => {
    try {
      const { type, input, frequency, priority } = req.body;
      const urls: string[] = [];

      if (type === 'text') {
        if (!input) {
          return res.status(400).json({ success: false, message: "No URLs provided" });
        }
        // Split by newlines and filter empty
        const rawUrls = input.split('\n').map((u: string) => u.trim()).filter((u: string) => u.length > 0);

        // Basic validation
        for (const url of rawUrls) {
          try {
            new URL(url);
            urls.push(url);
          } catch (e) {
            // skip invalid urls or throw error? Let's skip.
          }
        }

        if (urls.length === 0) {
          return res.status(400).json({ success: false, message: "No valid URLs found" });
        }

      } else if (type === 'url') {
        if (!input) {
          return res.status(400).json({ success: false, message: "No Homepage URL provided" });
        }

        try {
          const baseUrl = new URL(input);
          if (!['http:', 'https:'].includes(baseUrl.protocol)) {
            return res.status(400).json({ success: false, message: "Invalid protocol" });
          }

          // Shallow scan (same domain only)
          const response = await fetch(input);
          if (!response.ok) throw new Error("Failed to fetch page");

          const html = await response.text();

          const jsdom = (await import("jsdom")).default;
          const { JSDOM } = jsdom;
          const dom = new JSDOM(html);
          const doc = dom.window.document;
          const anchors = doc.querySelectorAll('a');

          const uniqueUrls = new Set<string>();
          uniqueUrls.add(baseUrl.href); // Add homepage

          anchors.forEach(a => {
            try {
              const href = a.href;
              if (!href) return;

              // Resolve relative URLs
              const resolvedUrl = new URL(href, baseUrl.href);

              // Only include same origin
              if (resolvedUrl.origin === baseUrl.origin) {
                // Remove hash
                resolvedUrl.hash = '';
                uniqueUrls.add(resolvedUrl.href);
              }
            } catch (e) {
              // ignore invalid
            }
          });

          // Limit to 100 for safety
          Array.from(uniqueUrls).slice(0, 100).forEach(u => urls.push(u));

        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Failed to scan website",
            error: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        return res.status(400).json({ success: false, message: "Invalid type" });
      }

      // Generate XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      const today = new Date().toISOString().split('T')[0];

      urls.forEach(url => {
        xml += '  <url>\n';
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        if (frequency && frequency !== 'never') {
          xml += `    <changefreq>${frequency}</changefreq>\n`;
        }
        if (priority) {
          xml += `    <priority>${priority}</priority>\n`;
        }
        xml += '  </url>\n';
      });

      xml += '</urlset>';

      res.json({ success: true, xml, count: urls.length });

    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate sitemap",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // AI Reply Generator Endpoint
  app.post("/api/generate-reply", async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "OpenAI API key is not configured on the server."
        });
      }

      const { message, instructions, context, source, language, style, length } = req.body;

      if (!message || !instructions) {
        return res.status(400).json({
          success: false,
          message: "Message and instructions are required"
        });
      }

      const prompt = `
        You are an expert ${language || 'English'} communication assistant.
        Please write a ${length || 'medium length'} ${style || 'professional'} reply to the following message from a source type of "${source || 'Email'}".

        INCOMING MESSAGE:
        "${message}"

        INSTRUCTIONS FOR REPLY:
        ${instructions}

        ${context ? `ADDITIONAL CONTEXT:\n${context}` : ''}

        Return only the reply text, no other conversation.
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      const reply = completion.choices[0].message.content;

      res.json({ success: true, reply });

    } catch (error) {
      console.error("AI Reply generation error:", error);
      // Handle 503 specifically? Or just general 500
      res.status(500).json({
        success: false,
        message: "Failed to generate reply",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // AI Prompt Generator Endpoint
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "OpenAI API key is not configured on the server."
        });
      }

      const { framework, data } = req.body;

      if (!framework || !data) {
        return res.status(400).json({
          success: false,
          message: "Framework and data are required"
        });
      }

      let prompt = "";

      if (framework === "APE") {
        prompt = `
            You are an expert prompt engineer.
            Create a high-quality, effective AI prompt using the **APE Framework** (Action, Purpose, Expectation) based on the user's input.
            
            Action: ${data.action}
            Purpose: ${data.purpose}
            Expectation: ${data.expectation}
            
            Output ONLY the optimized prompt text. Do not include labels like "Here is your prompt:".
         `;
      } else if (framework === "RACE") {
        prompt = `
            You are an expert prompt engineer.
            Create a high-quality, effective AI prompt using the **RACE Framework** (Role, Action, Context, Expectation) based on the user's input.
            
            Role: ${data.role}
            Action: ${data.action}
            Context: ${data.context}
            Expectation: ${data.expectation}
            
            Output ONLY the optimized prompt text.
         `;
      } else if (framework === "CREATE") {
        prompt = `
            You are an expert prompt engineer.
            Create a high-quality, effective AI prompt using the **CREATE Framework** based on the user's input.
            
            Character: ${data.character}
            Request: ${data.request}
            Example: ${data.example}
            Adjustment: ${data.adjustment}
            Type of Output: ${data.typeOfOutput}
            Extras: ${data.extras}
            
            Output ONLY the optimized prompt text.
         `;
      } else if (framework === "SPARK") {
        prompt = `
            You are an expert prompt engineer.
            Create a high-quality, effective AI prompt using the **SPARK Framework** based on the user's input.
            
            Situation: ${data.situation}
            Problem: ${data.problem}
            Aspiration: ${data.aspiration}
            Result: ${data.result}
            Kismet: ${data.kismet}
            
            Output ONLY the optimized prompt text.
         `;
      } else {
        return res.status(400).json({ success: false, message: "Invalid framework selected" });
      }

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      const generatedPrompt = completion.choices[0].message.content;

      res.json({ success: true, prompt: generatedPrompt });

    } catch (error) {
      console.error("AI Prompt generation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate prompt",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // PayPal Routes
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  const httpServer = createServer(app);
  return httpServer;
}
