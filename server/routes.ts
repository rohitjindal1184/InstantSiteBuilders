import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        id: submission.id 
      });
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

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching submissions" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
