import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Mock the email module
vi.mock('../server/email', () => ({
  sendContactNotification: vi.fn()
}));

// Mock environment variables
vi.mock('process', () => ({
  env: {
    OUTLOOK_EMAIL: 'test@example.com',
    OUTLOOK_PASSWORD: 'testpassword',
    NODE_ENV: 'test'
  }
}));

describe('Contact API Endpoints', () => {
  let app: express.Application;
  let server: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    server = await registerRoutes(app as any);
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  describe('POST /api/contact', () => {
    const validContactData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      message: 'We need a professional website for our growing business needs'
    };

    it('accepts valid contact form submission', async () => {
      const { sendContactNotification } = await import('../server/email');
      const mockSendEmail = sendContactNotification as any;
      mockSendEmail.mockResolvedValue(true);

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours."
      });

      expect(mockSendEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our growing business needs'
      });
    });

    it('validates required name field', async () => {
      const invalidData = { ...validContactData, name: '' };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Please check your form data');
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          path: ['name'],
          message: 'Name is required'
        })
      );
    });

    it('validates email format', async () => {
      const invalidData = { ...validContactData, email: 'invalid-email' };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          path: ['email'],
          message: 'Please enter a valid email address'
        })
      );
    });

    it('validates required company field', async () => {
      const invalidData = { ...validContactData, company: '' };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          path: ['company'],
          message: 'Business name is required'
        })
      );
    });

    it('validates message minimum length', async () => {
      const invalidData = { ...validContactData, message: 'Too short' };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          path: ['message'],
          message: 'Please provide more details about your business'
        })
      );
    });

    it('handles email sending failure gracefully', async () => {
      const { sendContactNotification } = await import('../server/email');
      const mockSendEmail = sendContactNotification as any;
      mockSendEmail.mockRejectedValue(new Error('SMTP connection failed'));

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "Failed to send your message. Please try again."
      });
    });

    it('handles malformed JSON data', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('rejects requests with missing Content-Type', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .unset('Content-Type')
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('handles requests with extra unexpected fields', async () => {
      const { sendContactNotification } = await import('../server/email');
      const mockSendEmail = sendContactNotification as any;
      mockSendEmail.mockResolvedValue(true);

      const dataWithExtraFields = {
        ...validContactData,
        unexpectedField: 'should be ignored',
        anotherField: 123
      };

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithExtraFields)
        .expect(201);

      expect(response.body.success).toBe(true);
      
      // Verify only expected fields are passed to email function
      expect(mockSendEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our growing business needs'
      });
    });

    it('handles special characters in form data', async () => {
      const { sendContactNotification } = await import('../server/email');
      const mockSendEmail = sendContactNotification as any;
      mockSendEmail.mockResolvedValue(true);

      const specialCharData = {
        name: 'José María González',
        email: 'josé@example.com',
        company: 'Café & Más',
        message: 'We need a website with special characters: àáâãäåæçèéêë & symbols: @#$%^&*()'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(specialCharData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(mockSendEmail).toHaveBeenCalledWith(specialCharData);
    });
  });

  describe('Error Handling', () => {
    it('returns 404 for unknown endpoints', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('handles OPTIONS requests for CORS', async () => {
      await request(app)
        .options('/api/contact')
        .expect(200);
    });
  });
});