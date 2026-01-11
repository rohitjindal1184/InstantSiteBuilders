import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendContactNotification } from "./email";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { z } from "zod";
import multer from "multer";

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

      // pdf-parse v2 exports PDFParse class - use ESM import
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: dataBuffer });
      const textResult = await parser.getText();
      const markdown = textResult.text; // TextResult has a .text property with the actual string

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
