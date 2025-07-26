// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSubmissionSchema } from "../shared/schema";
import { sendContactNotification } from "../server/email";
import { z } from "zod";

// In-memory storage for serverless functions
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: Date;
}

// Simple in-memory storage (resets on each function invocation)
let submissions: ContactSubmission[] = [];
let nextId = 1;

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
        
        // Create temporary submission object for email
        const submission: ContactSubmission = {
          ...validatedData,
          id: nextId++,
          createdAt: new Date(),
        };
        
        // Send email notification
        try {
          await sendContactNotification(submission);
          console.log('Email notification sent successfully');
        } catch (emailError) {
          console.warn('Failed to send email notification:', emailError);
        }
        
        return res.status(201).json({ 
          success: true, 
          message: "Thank you for your message! We'll get back to you within 24 hours."
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
            message: "An error occurred while processing your request",
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    // Get all contact submissions (for admin purposes) - disabled since we're only sending emails
    if (pathname === '/contact-submissions' && req.method === 'GET') {
      return res.json({ 
        message: "Contact submissions are sent via email only - no data is stored" 
      });
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