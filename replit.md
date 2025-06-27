# InstantSiteBuilders - Full-Stack Web Application

## Overview

InstantSiteBuilders is a full-stack web application that provides fast, affordable website and app development services for individuals and small businesses. The application features a modern React frontend with a contact form system and an Express.js backend with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for type-safe data validation
- **Development**: TSX for TypeScript execution

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Basic user authentication with username/password
- **Contact Submissions Table**: Stores contact form submissions with metadata
- **Validation**: Zod schemas for type safety and input validation

### API Endpoints (`server/routes.ts`)
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contact-submissions` - Retrieve all contact submissions (admin)

### Frontend Pages
- **Home Page**: Marketing landing page with contact form
- **404 Page**: Custom not-found page

### UI Components
- Complete shadcn/ui component library
- Custom form components with validation
- Responsive design with mobile support
- Toast notifications for user feedback

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on home page
   - React Hook Form handles form state and validation
   - Zod schema validates data on client-side
   - API request sent to `/api/contact` endpoint
   - Server validates data again with same Zod schema
   - Data stored in PostgreSQL database via Drizzle ORM
   - Success/error feedback shown via toast notifications

2. **Analytics Integration**:
   - Google Analytics 4 integration for tracking
   - Page view tracking on route changes
   - Event tracking for form submissions

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Database URL**: Required environment variable

### Analytics
- **Google Analytics 4**: Web analytics tracking
- **Environment Variable**: `VITE_GA_MEASUREMENT_ID` required

### UI Libraries
- **Radix UI**: Headless UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hook Form**: Form state management
- **TanStack Query**: Server state management

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development
- **Hot Reload**: Vite HMR for fast development
- **Port Configuration**: Development server on port 5000

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

### Database Management
- **Migrations**: Drizzle migrations in `./migrations` directory
- **Schema Push**: `npm run db:push` for development schema updates
- **Production**: Database schema managed via migrations

## Changelog

## Recent Changes

### June 27, 2025 - Professional Landing Page Complete
- ✓ Built complete InstantSiteBuilders landing page with modern design
- ✓ Implemented hero section with compelling headline and CTAs
- ✓ Added features section highlighting key benefits (speed, pricing, design, mobile)
- ✓ Created pricing section with 3-tier structure (Starter/Business/Pro)
- ✓ Integrated testimonials section with customer reviews
- ✓ Built functional contact form with backend validation
- ✓ Added navigation with smooth scrolling between sections
- ✓ Implemented SEO optimization with meta tags and OpenGraph
- ✓ Configured Google Analytics integration for visitor tracking
- ✓ Ensured mobile responsiveness across all devices
- ✓ Applied blue/green color scheme for trust and action
- ✓ Integrated custom logo in navigation and footer
- ✓ Set up email notifications via Outlook SMTP to rohitjindal1184@gmail.com

## User Preferences

Preferred communication style: Simple, everyday language.