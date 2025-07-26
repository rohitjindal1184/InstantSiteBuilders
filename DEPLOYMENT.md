# Deploying InstantSiteBuilders to Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **PostgreSQL Database**: Set up a production database (recommended: Neon, Supabase, or Railway)

## Environment Variables Setup

Before deploying, you'll need to configure these environment variables in Vercel:

### Required Variables
- `DATABASE_URL` - Your production PostgreSQL connection string
- `OUTLOOK_EMAIL` - Email for sending notifications
- `OUTLOOK_PASSWORD` - App password for the email account
- `PGHOST` - PostgreSQL host (usually included in DATABASE_URL)
- `PGPORT` - PostgreSQL port (usually 5432)
- `PGUSER` - PostgreSQL username
- `PGPASSWORD` - PostgreSQL password
- `PGDATABASE` - PostgreSQL database name

### Optional Variables
- `SENDGRID_API_KEY` - Alternative email service
- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `PAYPAL_CLIENT_ID` - PayPal payment integration
- `PAYPAL_CLIENT_SECRET` - PayPal secret key

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all required variables listed above

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add DATABASE_URL
   vercel env add OUTLOOK_EMAIL
   vercel env add OUTLOOK_PASSWORD
   ```

## Database Setup

### Using Neon (Recommended)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it as `DATABASE_URL` in Vercel environment variables

### Using Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the PostgreSQL connection string from Settings → Database
4. Add it as `DATABASE_URL` in Vercel environment variables

## Post-Deployment Steps

1. **Run Database Migration**:
   - In your local environment: `npm run db:push`
   - Or use Vercel CLI: `vercel env pull` then `npm run db:push`

2. **Test the Application**:
   - Visit your Vercel URL
   - Test the contact form
   - Verify email notifications are working

3. **Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correctly set
   - Check if database allows external connections
   - Ensure SSL is enabled for production databases

3. **Email Not Working**:
   - Verify OUTLOOK_EMAIL and OUTLOOK_PASSWORD are set
   - Check if app password is correctly generated
   - Review function logs in Vercel dashboard

4. **Static Assets Not Loading**:
   - Verify build output directory is `dist/public`
   - Check if all imports use relative paths
   - Ensure Vite build completes successfully

### Vercel Function Limits

- **Execution Time**: 30 seconds (configured in vercel.json)
- **Memory**: 1008 MB (default)
- **Payload Size**: 5 MB max

## Production Considerations

1. **Database Connection Pooling**: Use connection pooling for production databases
2. **Error Monitoring**: Consider adding Sentry or similar error tracking
3. **Performance**: Enable caching headers for static assets
4. **Security**: Ensure environment variables are properly secured
5. **Backup**: Set up automated database backups

## Cost Estimation

- **Vercel Pro**: $20/month for team features
- **Neon Database**: Free tier available, $19+/month for production
- **Email Service**: Outlook (free with existing account) or SendGrid (free tier available)

Your application should be fully functional on Vercel with proper configuration!