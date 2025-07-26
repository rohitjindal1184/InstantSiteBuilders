// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from "../server/storage";
import { insertContactSubmissionSchema } from "../shared/schema";
import { sendContactNotification } from "../server/email";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  try {
    // Contact form submission endpoint
    if (pathname === '/contact' && req.method === 'POST') {
      try {
        const validatedData = insertContactSubmissionSchema.parse(req.body);
        const submission = await storage.createContactSubmission(validatedData);
        
        // Send email notification (optional - won't fail if email fails)
        try {
          await sendContactNotification(submission);
        } catch (emailError) {
          console.warn('Failed to send email notification:', emailError);
        }
        
        return res.status(201).json({ 
          success: true, 
          message: "Thank you for your message! We'll get back to you within 24 hours.",
          id: submission.id 
        });
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
            message: "An error occurred while processing your request" 
          });
        }
      }
    }

    // Get all contact submissions (for admin purposes)
    if (pathname === '/contact-submissions' && req.method === 'GET') {
      try {
        const submissions = await storage.getContactSubmissions();
        return res.json(submissions);
      } catch (error) {
        console.error('Get submissions error:', error);
        return res.status(500).json({ 
          success: false, 
          message: "An error occurred while fetching submissions" 
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
      message: "Internal server error" 
    });
  }
}