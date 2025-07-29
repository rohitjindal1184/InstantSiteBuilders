import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendContactNotification } from '../server/email';
import nodemailer from 'nodemailer';

// Mock nodemailer
vi.mock('nodemailer');

// Mock environment variables
const mockEnv = {
  OUTLOOK_EMAIL: 'test@example.com',
  OUTLOOK_PASSWORD: 'testpassword'
};

vi.stubGlobal('process', {
  env: mockEnv
});

describe('Email Service', () => {
  const mockTransporter = {
    sendMail: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (nodemailer.createTransport as any).mockReturnValue(mockTransporter);
  });

  const validSubmission = {
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Corp',
    message: 'We need a professional website for our business'
  };

  it('creates transporter with correct SMTP configuration', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    await sendContactNotification(validSubmission);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'testpassword',
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    });
  });

  it('sends email with correct mail options', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    await sendContactNotification(validSubmission);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'test@example.com',
        to: 'rohitjindal1184@gmail.com',
        subject: 'New Contact Form Submission - John Doe',
        html: expect.stringContaining('John Doe'),
        text: expect.stringContaining('John Doe')
      })
    );
  });

  it('includes all submission data in email content', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    await sendContactNotification(validSubmission);

    const sentEmail = mockTransporter.sendMail.mock.calls[0][0];
    
    // Check HTML content
    expect(sentEmail.html).toContain('John Doe');
    expect(sentEmail.html).toContain('john@example.com');
    expect(sentEmail.html).toContain('Acme Corp');
    expect(sentEmail.html).toContain('We need a professional website for our business');
    
    // Check text content
    expect(sentEmail.text).toContain('John Doe');
    expect(sentEmail.text).toContain('john@example.com');
    expect(sentEmail.text).toContain('Acme Corp');
    expect(sentEmail.text).toContain('We need a professional website for our business');
  });

  it('handles line breaks in message content', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    const submissionWithLineBreaks = {
      ...validSubmission,
      message: 'Line 1\nLine 2\nLine 3'
    };

    await sendContactNotification(submissionWithLineBreaks);

    const sentEmail = mockTransporter.sendMail.mock.calls[0][0];
    
    // HTML should convert \n to <br>
    expect(sentEmail.html).toContain('Line 1<br>Line 2<br>Line 3');
    
    // Text should preserve \n
    expect(sentEmail.text).toContain('Line 1\nLine 2\nLine 3');
  });

  it('returns true on successful email send', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    const result = await sendContactNotification(validSubmission);

    expect(result).toBe(true);
  });

  it('returns false on email send failure', async () => {
    mockTransporter.sendMail.mockRejectedValue(new Error('SMTP connection failed'));

    const result = await sendContactNotification(validSubmission);

    expect(result).toBe(false);
  });

  it('handles missing email credentials gracefully', async () => {
    // Mock missing credentials
    vi.stubGlobal('process', {
      env: {
        OUTLOOK_EMAIL: undefined,
        OUTLOOK_PASSWORD: undefined
      }
    });

    const result = await sendContactNotification(validSubmission);

    expect(result).toBe(false);
    expect(nodemailer.createTransport).not.toHaveBeenCalled();
  });

  it('handles special characters in submission data', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    const specialCharSubmission = {
      name: 'José María González',
      email: 'josé@example.com',
      company: 'Café & Más',
      message: 'Special chars: àáâãäåæçèéêë & symbols: @#$%^&*()'
    };

    const result = await sendContactNotification(specialCharSubmission);

    expect(result).toBe(true);
    
    const sentEmail = mockTransporter.sendMail.mock.calls[0][0];
    expect(sentEmail.html).toContain('José María González');
    expect(sentEmail.html).toContain('josé@example.com');
    expect(sentEmail.html).toContain('Café & Más');
    expect(sentEmail.html).toContain('àáâãäåæçèéêë');
  });

  it('includes timestamp in email content', async () => {
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    // Mock Date.toLocaleString to return a predictable value
    const mockDate = '1/1/2024, 12:00:00 PM';
    vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue(mockDate);

    await sendContactNotification(validSubmission);

    const sentEmail = mockTransporter.sendMail.mock.calls[0][0];
    expect(sentEmail.html).toContain(mockDate);
    expect(sentEmail.text).toContain(mockDate);
  });

  it('logs success message on successful send', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockTransporter.sendMail.mockResolvedValue({ messageId: 'test-id' });

    await sendContactNotification(validSubmission);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Contact form notification sent successfully to rohitjindal1184@gmail.com'
    );
  });

  it('logs error message on send failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('SMTP connection failed');
    mockTransporter.sendMail.mockRejectedValue(error);

    await sendContactNotification(validSubmission);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error sending contact form notification:',
      error
    );
  });
});