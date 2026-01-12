// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from "zod";
import nodemailer from 'nodemailer';

// Inline schema definition for serverless deployment
const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Business name is required"),
  message: z.string().min(10, "Please provide more details about your business"),
});

// Inline email functionality for serverless deployment
function createTransporter() {
  if (!process.env.OUTLOOK_EMAIL || !process.env.OUTLOOK_PASSWORD) {
    console.warn('Email credentials not configured - emails will not be sent');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000
  });
}

async function sendContactNotification(submission: any): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('Email transporter not configured - skipping email');
      return true; // Don't fail the request if email isn't configured
    }

    console.log('Sending email notification...');
    const now = new Date().toLocaleString();

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: 'rohitjindal1184@gmail.com',
      subject: `New Contact Form Submission - ${submission.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${submission.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${submission.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Business Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${submission.company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Submitted:</td>
                <td style="padding: 8px 0; color: #1f2937;">${now}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h3 style="color: #374151; margin-top: 0;">Business Details</h3>
            <p style="color: #1f2937; line-height: 1.6; margin: 0;">${submission.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              This email was sent from your InstantSiteBuilders contact form.
            </p>
          </div>
        </div>
      `,
      text: `New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Business Name: ${submission.company}
Submitted: ${now}

Business Details:
${submission.message}

This email was sent from your InstantSiteBuilders contact form.`
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact form notification sent successfully to rohitjindal1184@gmail.com');
    return true;
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API Request:', req.method, req.url);

  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Parse the URL to determine which endpoint to handle
    const url = new URL(req.url || '', 'http://localhost');
    const pathname = url.pathname.replace('/api', '');
    console.log('Parsed pathname:', pathname);
    // Contact form submission endpoint
    if (pathname === '/contact' && req.method === 'POST') {
      try {
        console.log('Processing contact form submission:', req.body);
        const validatedData = insertContactSubmissionSchema.parse(req.body);
        console.log('Data validated successfully:', validatedData);

        // Send email notification directly
        try {
          await sendContactNotification(validatedData);
          console.log('Email notification sent successfully');

          return res.status(201).json({
            success: true,
            message: "Thank you for your message! We'll get back to you within 24 hours."
          });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);

          return res.status(500).json({
            success: false,
            message: "Failed to send your message. Please try again."
          });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            success: false,
            message: "Please check your form data",
            errors: error.errors
          });
        } else {
          console.error('Contact form error:', error);
          return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    // PDF Conversion endpoint
    if (pathname === '/convert-pdf' && req.method === 'POST') {
      try {
        console.log('Processing PDF conversion request');

        const contentType = req.headers['content-type'] || '';

        if (!contentType.includes('multipart/form-data')) {
          return res.status(400).json({
            success: false,
            message: 'Content-Type must be multipart/form-data'
          });
        }

        // Parse multipart form data using busboy (streams to memory, Vercel-friendly)
        const Busboy = (await import('busboy')).default;
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

        const parseFile = (): Promise<Buffer> => {
          return new Promise((resolve, reject) => {
            const busboy = Busboy({
              headers: req.headers as any,
              limits: { fileSize: MAX_FILE_SIZE }
            });
            const chunks: Buffer[] = [];
            let fileFound = false;
            let totalSize = 0;

            busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
              console.log('Receiving file:', info.filename, 'mimetype:', info.mimeType);
              fileFound = true;

              file.on('data', (data: Buffer) => {
                totalSize += data.length;
                if (totalSize > MAX_FILE_SIZE) {
                  file.resume(); // Drain the stream
                  reject(new Error('File size exceeds 2MB limit'));
                  return;
                }
                chunks.push(data);
              });

              file.on('end', () => {
                console.log('File received, total size:', chunks.reduce((acc, c) => acc + c.length, 0));
              });
            });

            busboy.on('finish', () => {
              if (!fileFound || chunks.length === 0) {
                reject(new Error('No file uploaded'));
              } else {
                resolve(Buffer.concat(chunks));
              }
            });

            busboy.on('error', (err: Error) => {
              reject(err);
            });

            // Pipe the request to busboy
            if (req.body && Buffer.isBuffer(req.body)) {
              // Vercel might have already parsed the body as a buffer
              busboy.end(req.body);
            } else if (typeof req.pipe === 'function') {
              req.pipe(busboy);
            } else {
              reject(new Error('Unable to read request body'));
            }
          });
        };

        const dataBuffer = await parseFile();
        console.log('Buffer size:', dataBuffer.length);

        // Parse PDF using pdf-parse v1.x - import from lib directly to avoid debug mode
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
        const data = await pdfParse(dataBuffer);
        const markdown = data.text;

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('PDF conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert PDF',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // HTML to Markdown Conversion endpoint
    if (pathname === '/convert-html' && req.method === 'POST') {
      try {
        console.log('Processing HTML conversion request');

        let htmlContent = '';

        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          // Parse multipart form data using busboy
          const zip = (await import('busboy')).default;
          // Note: busboy might be exported as default or named export depending on version/bundler
          // We used 'const Busboy = (await import('busboy')).default;' in PDF section, let's reuse that pattern
          const Busboy = (await import('busboy')).default;

          const parseFile = (): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
              const busboy = Busboy({
                headers: req.headers,
                limits: {
                  fileSize: 2 * 1024 * 1024, // 2MB limit
                  files: 1
                }
              });

              const chunks: Buffer[] = [];
              let fileFound = false;

              busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
                if (fieldname !== 'file') {
                  file.resume();
                  return;
                }

                fileFound = true;
                file.on('data', (data: Buffer) => {
                  if (chunks.reduce((acc, c) => acc + c.length, 0) + data.length > 2 * 1024 * 1024) {
                    file.resume();
                    reject(new Error('File size exceeds limit'));
                    return;
                  }
                  chunks.push(data);
                });

                file.on('end', () => {
                  console.log('File received, total size:', chunks.reduce((acc, c) => acc + c.length, 0));
                });
              });

              busboy.on('finish', () => {
                if (!fileFound || chunks.length === 0) {
                  reject(new Error('No file uploaded'));
                } else {
                  resolve(Buffer.concat(chunks));
                }
              });

              busboy.on('error', (err: Error) => {
                reject(err);
              });

              // Pipe the request to busboy
              // In Vercel, req.body might already be parsed for some content types,
              // but for multipart it usually isn't unless we disable bodyParser.
              // However, since we are in a monorepo structure where we might not have full control over next.js config easily here,
              // we follow the pattern used in the successful PDF implementation:
              if (req.body && Buffer.isBuffer(req.body)) {
                busboy.end(req.body);
              } else if (typeof req.pipe === 'function') {
                req.pipe(busboy);
              } else {
                reject(new Error('Unable to read request body'));
              }
            });
          };

          const fileBuffer = await parseFile();
          htmlContent = fileBuffer.toString('utf-8');

        } else {
          // Handle JSON body
          const { html } = req.body as { html?: string };
          if (!html || typeof html !== 'string') {
            return res.status(400).json({
              success: false,
              message: 'HTML content is required'
            });
          }
          htmlContent = html;
        }

        if (htmlContent.length > 500000 && !contentType.includes('multipart/form-data')) { // 500KB limit for text input
          // Check performed earlier for files inside busboy logic
          return res.status(400).json({
            success: false,
            message: 'HTML content exceeds limit'
          });
        }

        // Convert HTML to Markdown using turndown
        const TurndownService = (await import('turndown')).default;
        const turndownService = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced'
        });
        const markdown = turndownService.turndown(htmlContent);

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('HTML conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert HTML',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // XML to Markdown Conversion endpoint
    if (pathname === '/convert-xml' && req.method === 'POST') {
      try {
        console.log('Processing XML conversion request');

        let xmlContent = '';

        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          // Parse multipart form data using busboy
          const zip = (await import('busboy')).default;
          // Note: busboy might be exported as default or named export depending on version/bundler
          const Busboy = (await import('busboy')).default;

          const parseFile = (): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
              const busboy = Busboy({
                headers: req.headers,
                limits: {
                  fileSize: 2 * 1024 * 1024, // 2MB limit
                  files: 1
                }
              });

              const chunks: Buffer[] = [];
              let fileFound = false;

              busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
                if (fieldname !== 'file') {
                  file.resume();
                  return;
                }

                fileFound = true;
                file.on('data', (data: Buffer) => {
                  if (chunks.reduce((acc, c) => acc + c.length, 0) + data.length > 2 * 1024 * 1024) {
                    file.resume();
                    reject(new Error('File size exceeds limit'));
                    return;
                  }
                  chunks.push(data);
                });

                file.on('end', () => {
                  console.log('File received, total size:', chunks.reduce((acc, c) => acc + c.length, 0));
                });
              });

              busboy.on('finish', () => {
                if (!fileFound || chunks.length === 0) {
                  reject(new Error('No file uploaded'));
                } else {
                  resolve(Buffer.concat(chunks));
                }
              });

              busboy.on('error', (err: Error) => {
                reject(err);
              });

              if (req.body && Buffer.isBuffer(req.body)) {
                busboy.end(req.body);
              } else if (typeof req.pipe === 'function') {
                req.pipe(busboy);
              } else {
                reject(new Error('Unable to read request body'));
              }
            });
          };

          const fileBuffer = await parseFile();
          xmlContent = fileBuffer.toString('utf-8');

        } else {
          // Handle JSON body
          const { xml } = req.body as { xml?: string };
          if (!xml || typeof xml !== 'string') {
            return res.status(400).json({
              success: false,
              message: 'XML content is required'
            });
          }
          xmlContent = xml;
        }

        if (xmlContent.length > 500000 && !contentType.includes('multipart/form-data')) { // 500KB limit for text input
          return res.status(400).json({
            success: false,
            message: 'XML content exceeds limit'
          });
        }

        // Convert XML to Markdown using turndown
        const TurndownService = (await import('turndown')).default;
        const turndownService = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced'
        });
        const markdown = turndownService.turndown(xmlContent);

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('XML conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert XML',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // JSON to Markdown Conversion endpoint
    if (pathname === '/convert-json' && req.method === 'POST') {
      try {
        console.log('Processing JSON conversion request');

        let jsonContent = '';

        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          // Parse multipart form data using busboy
          const zip = (await import('busboy')).default;
          const Busboy = (await import('busboy')).default;

          const parseFile = (): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
              const busboy = Busboy({
                headers: req.headers,
                limits: {
                  fileSize: 2 * 1024 * 1024, // 2MB limit
                  files: 1
                }
              });

              const chunks: Buffer[] = [];
              let fileFound = false;

              busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
                if (fieldname !== 'file') {
                  file.resume();
                  return;
                }

                fileFound = true;
                file.on('data', (data: Buffer) => {
                  if (chunks.reduce((acc, c) => acc + c.length, 0) + data.length > 2 * 1024 * 1024) {
                    file.resume();
                    reject(new Error('File size exceeds limit'));
                    return;
                  }
                  chunks.push(data);
                });

                file.on('end', () => {
                  console.log('File received, total size:', chunks.reduce((acc, c) => acc + c.length, 0));
                });
              });

              busboy.on('finish', () => {
                if (!fileFound || chunks.length === 0) {
                  reject(new Error('No file uploaded'));
                } else {
                  resolve(Buffer.concat(chunks));
                }
              });

              busboy.on('error', (err: Error) => {
                reject(err);
              });

              if (req.body && Buffer.isBuffer(req.body)) {
                busboy.end(req.body);
              } else if (typeof req.pipe === 'function') {
                req.pipe(busboy);
              } else {
                reject(new Error('Unable to read request body'));
              }
            });
          };

          const fileBuffer = await parseFile();
          jsonContent = fileBuffer.toString('utf-8');

        } else {
          // Handle JSON body
          const { json } = req.body as { json?: string };
          if (!json || typeof json !== 'string') {
            return res.status(400).json({
              success: false,
              message: 'JSON content is required'
            });
          }
          jsonContent = json;
        }

        if (jsonContent.length > 500000 && !contentType.includes('multipart/form-data')) {
          return res.status(400).json({
            success: false,
            message: 'JSON content exceeds limit'
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
          // Get all unique keys from all objects
          const keys = Array.from(new Set(parsed.flatMap((item: any) =>
            (typeof item === 'object' && item !== null) ? Object.keys(item) : []
          )));

          if (keys.length > 0) {
            // Header
            markdown += '| ' + keys.join(' | ') + ' |\n';
            // Separator
            markdown += '| ' + keys.map(() => '---').join(' | ') + ' |\n';
            // Rows
            parsed.forEach((item: any) => {
              const row = keys.map(k => {
                const val = item?.[k];
                if (val === null || val === undefined) return '';
                if (typeof val === 'object') return JSON.stringify(val);
                return String(val).replace(/\|/g, '\\|'); // Escape pipes
              });
              markdown += '| ' + row.join(' | ') + ' |\n';
            });
          } else {
            // Array of empty objects or something weird
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

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('JSON conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert JSON',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // RTF to Markdown Conversion endpoint
    if (pathname === '/convert-rtf' && req.method === 'POST') {
      try {
        console.log('Processing RTF conversion request');

        let rtfContent = '';

        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          // Parse multipart form data using busboy
          const zip = (await import('busboy')).default;
          const Busboy = (await import('busboy')).default;

          const parseFile = (): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
              const busboy = Busboy({
                headers: req.headers,
                limits: {
                  fileSize: 2 * 1024 * 1024, // 2MB limit
                  files: 1
                }
              });

              const chunks: Buffer[] = [];
              let fileFound = false;

              busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
                if (fieldname !== 'file') {
                  file.resume();
                  return;
                }

                fileFound = true;
                file.on('data', (data: Buffer) => {
                  if (chunks.reduce((acc, c) => acc + c.length, 0) + data.length > 2 * 1024 * 1024) {
                    file.resume();
                    reject(new Error('File size exceeds limit'));
                    return;
                  }
                  chunks.push(data);
                });

                file.on('end', () => {
                  console.log('File received, total size:', chunks.reduce((acc, c) => acc + c.length, 0));
                });
              });

              busboy.on('finish', () => {
                if (!fileFound || chunks.length === 0) {
                  reject(new Error('No file uploaded'));
                } else {
                  resolve(Buffer.concat(chunks));
                }
              });

              busboy.on('error', (err: Error) => {
                reject(err);
              });

              if (req.body && Buffer.isBuffer(req.body)) {
                busboy.end(req.body);
              } else if (typeof req.pipe === 'function') {
                req.pipe(busboy);
              } else {
                reject(new Error('Unable to read request body'));
              }
            });
          };

          const fileBuffer = await parseFile();
          rtfContent = fileBuffer.toString('utf-8');

        } else {
          // Handle JSON body
          const { rtf } = req.body as { rtf?: string };
          if (!rtf || typeof rtf !== 'string') {
            return res.status(400).json({
              success: false,
              message: 'RTF content is required'
            });
          }
          rtfContent = rtf;
        }

        if (rtfContent.length > 2 * 1024 * 1024 && !contentType.includes('multipart/form-data')) {
          // Basic length check for text, though RTF can be large. 2MB is safe.
          return res.status(400).json({
            success: false,
            message: 'RTF content exceeds limit'
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

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('RTF conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert RTF',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Sitemap Validator endpoint
    if (pathname === '/validate-sitemap' && req.method === 'POST') {
      try {
        console.log('Processing Sitemap validation request');
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
            valid = false;
          }
        } else if (sitemapindex) {
          const sitemaps = doc.querySelectorAll("sitemap");
          urlCount = sitemaps.length;
          if (urlCount === 0) {
            errors.push("No <sitemap> elements found in <sitemapindex>");
            valid = false;
          }
        }

        if (doc.querySelector("parsererror")) {
          errors.push("XML parsing error. content is not valid XML.");
          valid = false;
        }

        return res.status(200).json({ success: true, valid, urlCount, errors });

      } catch (error) {
        console.error("Sitemap validation error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to validate sitemap",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Sitemap Generator endpoint
    if (pathname === '/generate-sitemap' && req.method === 'POST') {
      try {
        console.log('Processing Sitemap generation request');
        const { type, input, frequency, priority } = req.body;
        const urls: string[] = [];

        if (type === 'text') {
          if (!input) {
            return res.status(400).json({ success: false, message: "No URLs provided" });
          }
          const rawUrls = input.split('\n').map((u: string) => u.trim()).filter((u: string) => u.length > 0);

          for (const url of rawUrls) {
            try {
              new URL(url);
              urls.push(url);
            } catch (e) {
              // skip
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

            const response = await fetch(input);
            if (!response.ok) throw new Error("Failed to fetch page");

            const html = await response.text();

            const jsdom = (await import("jsdom")).default;
            const { JSDOM } = jsdom;
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const anchors = doc.querySelectorAll('a');

            const uniqueUrls = new Set<string>();
            uniqueUrls.add(baseUrl.href);

            anchors.forEach(a => {
              try {
                const href = a.href;
                if (!href) return;
                const resolvedUrl = new URL(href, baseUrl.href);
                if (resolvedUrl.origin === baseUrl.origin) {
                  resolvedUrl.hash = '';
                  uniqueUrls.add(resolvedUrl.href);
                }
              } catch (e) { }
            });

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

        return res.status(200).json({ success: true, xml, count: urls.length });

      } catch (error) {
        console.error("Sitemap generation error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to generate sitemap",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // URL to Markdown Conversion endpoint
    if (pathname === '/convert-url' && req.method === 'POST') {
      try {
        console.log('Processing URL conversion request');
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

        const markdown = turndownService.turndown(htmlContent);

        return res.status(200).json({
          success: true,
          markdown
        });
      } catch (error) {
        console.error('URL conversion error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to convert URL',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Default 404 response
    return res.status(404).json({
      success: false,
      message: "API endpoint not found"
    });

  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}