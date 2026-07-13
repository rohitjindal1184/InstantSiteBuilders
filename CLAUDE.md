# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

InstantSiteBuilders — a marketing site for free website design services, plus a suite of free web tools (file-to-Markdown converters, sitemap tools, AI email reply/prompt generators). React SPA frontend, Express backend for local dev, deployed to Vercel as a static site + one serverless function.

## Commands

```bash
npm run dev          # Dev server (Express + Vite HMR) on port 5000
npm run build        # vite build (→ dist/public) + esbuild server bundle (→ dist/index.js)
npm run check        # TypeScript typecheck (tsc)
npm run db:push      # Push Drizzle schema to Postgres
npx vitest           # Run tests (no npm test script; watch mode by default)
npx vitest run       # Run tests once
npx vitest run tests/api.test.ts             # Single test file
npx vitest run -t "validates email format"   # Single test by name
```

Environment: copy `.env.example` to `.env`. Everything is optional-degrading — email (OUTLOOK_EMAIL/OUTLOOK_PASSWORD), PayPal, OpenAI, and the database are all skipped gracefully when credentials are absent, so the app runs with no `.env` at all.

## Architecture

### Dual backend — the critical gotcha

Every API endpoint is implemented **twice**:

1. **`server/routes.ts`** — Express routes, used only by `npm run dev` locally.
2. **`api/index.ts`** — a single self-contained Vercel serverless function (~1100 lines) that switch-routes on pathname (`/contact`, `/convert-pdf`, `/generate-sitemap`, …). This is what runs in **production**. It deliberately inlines its own copies of the Zod schema, email transporter, and conversion logic — no imports from `server/` or `shared/` — because module resolution broke Vercel deploys in the past.

**When adding or changing an API endpoint, update both files**, keeping api/index.ts self-contained. They have already drifted: `/api/generate-reply` and `/api/generate-prompt` exist only in server/routes.ts (broken in production); `/api/extract-sitemap-urls` exists only in api/index.ts. `vercel.json` rewrites all `/api/*` traffic to `api/index` and everything else to `index.html`.

### Frontend

- `client/src/App.tsx` — wouter routes; each tool page in `client/src/pages/` maps to a URL like `/convert-pdf-to-markdown`. New pages need a route here plus entries in `client/public/sitemap.xml`.
- shadcn/ui components in `client/src/components/ui/` (Radix + Tailwind, config in `components.json`).
- TanStack Query via `client/src/lib/queryClient.ts` for API calls; React Hook Form + Zod for forms.
- Analytics is doubled up: Google Analytics (`client/src/lib/analytics.ts`, `VITE_GA_MEASUREMENT_ID`) and Vercel Analytics — use the `@vercel/analytics/react` import, not `/next`.
- Path aliases: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/` (defined in both vite.config.ts and vitest.config.ts).

### Data & email

- `shared/schema.ts` — Drizzle tables + Zod insert schemas (source of truth for the Express side; api/index.ts has its own inline copy).
- The contact form currently **only sends email** (Outlook SMTP via nodemailer to rohitjindal1184@gmail.com); `server/storage.ts` has both `MemStorage` and a Neon/Drizzle implementation but persistence was intentionally removed from the contact flow.

### Tests

Vitest + React Testing Library + Supertest, jsdom environment, setup in `tests/setup.ts`. The four suites mirror the architecture: `contact-form.test.tsx` (frontend), `api.test.ts` (Express), `serverless.test.ts` (Vercel function), `email.test.ts`. Some email error-handling tests fail intentionally — see `tests/README.md` and `TEST_RESULTS.md` before assuming a regression.

## Repo notes

- `replit.md` is the historical project log (Replit origin); `DEPLOYMENT.md` covers Vercel deploy steps.
- `debug_*.cjs/ts` files at the root are ad-hoc debugging scripts, not part of the app.
