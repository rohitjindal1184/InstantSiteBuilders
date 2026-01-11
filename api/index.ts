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

        // Vercel handles body parsing - check if file data is in the body
        // For multipart form data, we need to use a different approach
        const contentType = req.headers['content-type'] || '';

        if (!contentType.includes('multipart/form-data')) {
          return res.status(400).json({
            success: false,
            message: 'Content-Type must be multipart/form-data'
          });
        }

        // Parse multipart form data manually for Vercel
        const { IncomingForm } = await import('formidable');
        const form = new IncomingForm({
          maxFileSize: 2 * 1024 * 1024, // 2MB limit
        });

        const parseForm = (): Promise<{ fields: any; files: any }> => {
          return new Promise((resolve, reject) => {
            form.parse(req as any, (err, fields, files) => {
              if (err) reject(err);
              else resolve({ fields, files });
            });
          });
        };

        const { files } = await parseForm();
        const uploadedFile = files.file?.[0] || files.file;

        if (!uploadedFile) {
          return res.status(400).json({
            success: false,
            message: 'No file uploaded'
          });
        }

        // Read the file buffer
        const fs = await import('fs');
        const dataBuffer = await fs.promises.readFile(uploadedFile.filepath);

        // Parse PDF using pdf-parse v2
        const { PDFParse } = await import('pdf-parse');
        const parser = new PDFParse({ data: dataBuffer });
        const textResult = await parser.getText();
        const markdown = textResult.text;

        // Clean up temp file
        await fs.promises.unlink(uploadedFile.filepath).catch(() => { });

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