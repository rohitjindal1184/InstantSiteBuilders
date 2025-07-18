import sgMail from '@sendgrid/mail';
import type { ContactSubmission } from '@shared/schema';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendContactNotification(submission: ContactSubmission): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured - email notifications disabled');
      return false;
    }

    const mailOptions = {
      to: 'rohitjindal1184@gmail.com',
      from: {
        email: 'noreply@instantsitebuilders.com',
        name: 'InstantSiteBuilders'
      },
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
                <td style="padding: 8px 0; color: #1f2937;">${submission.createdAt.toLocaleString()}</td>
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
      text: `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Business Name: ${submission.company}
Submitted: ${submission.createdAt.toLocaleString()}

Business Details:
${submission.message}

This email was sent from your InstantSiteBuilders contact form.
      `
    };

    await sgMail.send(mailOptions);
    console.log('Contact form notification sent successfully to rohitjindal1184@gmail.com');
    return true;
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    return false;
  }
}