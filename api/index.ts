// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSubmissionSchema, contactSubmissions } from "../shared/schema";
import { sendContactNotification } from "../server/email";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

// Initialize database connection for serverless
let db: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
  }
  return db;
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
        
        // Direct database operation for serverless
        const database = getDatabase();
        const result = await database.insert(contactSubmissions).values(validatedData).returning();
        const submission = result[0];
        console.log('Submission created:', submission.id);
        
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
            message: "An error occurred while processing your request",
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    // Get all contact submissions (for admin purposes)
    if (pathname === '/contact-submissions' && req.method === 'GET') {
      try {
        const database = getDatabase();
        const submissions = await database.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
        return res.json(submissions.reverse()); // Most recent first
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
      message: "Internal server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}