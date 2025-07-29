import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock nodemailer for serverless function
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn()
  }
}));

// Mock environment variables
const mockEnv = {
  OUTLOOK_EMAIL: 'test@example.com',
  OUTLOOK_PASSWORD: 'testpassword'
};

vi.stubGlobal('process', {
  env: mockEnv
});

// Import the serverless function after mocking
const handler = await import('../api/index').then(m => m.default);

describe('Vercel Serverless Function', () => {
  let mockRequest: Partial<VercelRequest>;
  let mockResponse: Partial<VercelResponse>;
  let responseData: any;
  let statusCode: number;

  beforeEach(() => {
    vi.clearAllMocks();
    responseData = null;
    statusCode = 200;

    mockResponse = {
      setHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockImplementation((data) => {
        responseData = data;
        return mockResponse;
      }),
      end: vi.fn()
    };

    // Mock the status method to capture status codes
    (mockResponse.status as any).mockImplementation((code: number) => {
      statusCode = code;
      return mockResponse;
    });
  });

  it('handles CORS preflight requests', async () => {
    mockRequest = {
      method: 'OPTIONS',
      url: '/api/contact'
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockResponse.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'Content-Type');
    expect(statusCode).toBe(200);
    expect(mockResponse.end).toHaveBeenCalled();
  });

  it('processes valid contact form submissions', async () => {
    const nodemailer = await import('nodemailer');
    const mockTransporter = {
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' })
    };
    (nodemailer.default.createTransport as any).mockReturnValue(mockTransporter);

    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our business needs'
      }
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(201);
    expect(responseData).toEqual({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours."
    });
    expect(mockTransporter.sendMail).toHaveBeenCalled();
  });

  it('validates contact form data', async () => {
    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: '',
        email: 'invalid-email',
        company: '',
        message: 'short'
      }
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(400);
    expect(responseData.success).toBe(false);
    expect(responseData.message).toBe('Please check your form data');
    expect(responseData.errors).toBeDefined();
    expect(responseData.errors.length).toBeGreaterThan(0);
  });

  it('handles email sending failures gracefully', async () => {
    const nodemailer = await import('nodemailer');
    const mockTransporter = {
      sendMail: vi.fn().mockRejectedValue(new Error('SMTP failed'))
    };
    (nodemailer.default.createTransport as any).mockReturnValue(mockTransporter);

    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our business needs'
      }
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(500);
    expect(responseData).toEqual({
      success: false,
      message: "Failed to send your message. Please try again."
    });
  });

  it('works without email credentials', async () => {
    // Mock missing credentials
    vi.stubGlobal('process', {
      env: {
        OUTLOOK_EMAIL: undefined,
        OUTLOOK_PASSWORD: undefined
      }
    });

    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our business needs'
      }
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(201);
    expect(responseData.success).toBe(true);
  });

  it('returns 404 for unknown endpoints', async () => {
    mockRequest = {
      method: 'GET',
      url: '/api/unknown'
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(404);
    expect(responseData).toEqual({
      success: false,
      message: "API endpoint not found"
    });
  });

  it('handles malformed requests gracefully', async () => {
    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: null
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(400);
    expect(responseData.success).toBe(false);
  });

  it('parses URL paths correctly', async () => {
    mockRequest = {
      method: 'POST',
      url: '/api/contact?utm_source=testing',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our business needs'
      }
    };

    const nodemailer = await import('nodemailer');
    const mockTransporter = {
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' })
    };
    (nodemailer.default.createTransport as any).mockReturnValue(mockTransporter);

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(201);
    expect(responseData.success).toBe(true);
  });

  it('includes proper error details for debugging', async () => {
    mockRequest = {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        message: 'We need a professional website for our business needs'
      }
    };

    const nodemailer = await import('nodemailer');
    const mockTransporter = {
      sendMail: vi.fn().mockRejectedValue(new Error('Network timeout'))
    };
    (nodemailer.default.createTransport as any).mockReturnValue(mockTransporter);

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(statusCode).toBe(500);
    expect(responseData.success).toBe(false);
    expect(responseData.message).toBe("Failed to send your message. Please try again.");
  });
});