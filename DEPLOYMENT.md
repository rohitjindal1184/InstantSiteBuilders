# Deployment Guide - InstantSiteBuilders

This guide covers deploying the InstantSiteBuilders application to Vercel with the latest fixes for contact form functionality.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: Neon Database account with PostgreSQL database
3. **Email Service**: Outlook/Hotmail account for SMTP (optional)
4. **PayPal Developer Account**: For payment processing (optional)

## Recent Fixes Applied

The following issues have been resolved for Vercel deployment:

✓ **API Function Structure**: Converted Express routes to Vercel serverless function format
✓ **CORS Headers**: Added proper CORS configuration for API requests
✓ **Error Handling**: Improved error handling with detailed logging
✓ **Email Resilience**: Made email sending optional to prevent form failures
✓ **Database Connection**: Optimized database connections for serverless environment
✓ **Route Configuration**: Fixed static file serving in vercel.json

## Environment Variables

Set up the following environment variables in Vercel:

### Required
- `DATABASE_URL`: Your Neon Database connection string
- `NODE_ENV`: Set to `production`

### Optional (Email)
- `OUTLOOK_EMAIL`: Your Outlook/Hotmail email address  
- `OUTLOOK_PASSWORD`: Your email password or app-specific password

### Optional (PayPal)
- `PAYPAL_CLIENT_ID`: PayPal client ID for payments
- `PAYPAL_CLIENT_SECRET`: PayPal client secret
- `PAYPAL_BASE_URL`: `https://api.sandbox.paypal.com` (sandbox) or `https://api.paypal.com` (production)

### Optional (Analytics)
- `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 measurement ID

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is in a Git repository with the latest changes:

```bash
git add .
git commit -m "Apply Vercel deployment fixes"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub/GitLab repository
4. Vercel will automatically detect the framework settings

### 3. Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In the Vercel project settings:

1. Go to "Environment Variables" tab
2. Add each required environment variable
3. Set the environment to "Production" (and "Preview" if needed)

**Critical**: Ensure `DATABASE_URL` is set correctly - the contact form will fail without it.

### 5. Deploy

Click "Deploy" to start the build process. Vercel will:

1. Install dependencies
2. Run the build command
3. Deploy the static files and serverless functions

## Database Setup

### 1. Create Neon Database

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (should start with `postgresql://`)

### 2. Run Database Migrations

Before first deployment, run migrations locally:

```bash
# Set your DATABASE_URL in .env locally
npm run db:push
```

Or run migrations after deployment using Vercel CLI:

```bash
vercel env pull .env.local
npm run db:push
```

## Troubleshooting Contact Form Issues

### Form Submission Fails with 500 Error

1. **Check Environment Variables**: Verify `DATABASE_URL` is set in Vercel
2. **Database Connection**: Ensure Neon database is active and accessible
3. **Function Logs**: Check Vercel function logs for specific error messages
4. **Timeout Issues**: Contact form has 30-second timeout configured

### Email Notifications Not Working

The contact form will still work even if email fails:

1. **Form saves to database** regardless of email status
2. **Email is optional** - form won't fail if SMTP credentials are missing
3. **Check function logs** for email-specific error messages
4. **Verify SMTP settings** if email notifications are needed

### CORS Issues

If form submissions fail due to CORS:

1. Check that API function includes proper CORS headers
2. Verify the frontend is making requests to correct domain
3. Check browser network tab for specific CORS errors

## Email Configuration

### Outlook/Hotmail Setup

1. Enable 2-factor authentication on your Microsoft account
2. Generate an app-specific password:
   - Go to Microsoft Account Security
   - Select "App passwords"
   - Generate new password for "Mail"
3. Use this app password as `OUTLOOK_PASSWORD`

### Alternative: SendGrid

If Outlook doesn't work, you can switch to SendGrid:

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Set `SENDGRID_API_KEY` environment variable
4. Update `server/email.ts` to use SendGrid instead

## PayPal Configuration

### 1. Create PayPal Developer Account

1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create a business account
3. Create a new app in the developer dashboard

### 2. Get API Credentials

1. Copy the Client ID and Secret
2. For testing, use sandbox credentials
3. For production, use live credentials

### 3. Set Environment Variables

```
PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_SECRET=your_client_secret_here
PAYPAL_BASE_URL=https://api.sandbox.paypal.com  # or https://api.paypal.com for production
```

## Google Analytics (Optional)

1. Create a Google Analytics 4 property
2. Get the Measurement ID (starts with "G-")
3. Set `VITE_GA_MEASUREMENT_ID` environment variable

## Domain Configuration

### Custom Domain

1. In Vercel dashboard, go to project settings
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

### SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## Monitoring and Logs

### View Deployment Logs

1. Go to Vercel dashboard
2. Click on your project
3. Click on a deployment to view build logs

### Function Logs

1. In project dashboard, click "Functions" tab
2. Click on a function to view runtime logs
3. Use `console.log()` in your code for debugging

**Important**: Check function logs immediately if contact form isn't working.

## Testing the Deployment

After deployment, test these critical features:

1. **Contact Form**: Submit a test message and verify it works
2. **Database Storage**: Check if submissions are saved to database
3. **Email Notifications**: Verify emails are sent (if configured)
4. **Error Handling**: Test form with invalid data

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Contact Vercel support through their dashboard
- Review function logs for specific error messages
- Check database connectivity in Neon dashboard