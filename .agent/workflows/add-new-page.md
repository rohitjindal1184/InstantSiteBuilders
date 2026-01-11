---
description: How to add a new page/tool to this Vercel-deployed React SPA
---

# Adding New Pages to InstantSiteBuilders

## 1. Create the React Page Component
- Add new page in `client/src/pages/[page-name].tsx`
- Add SEO using `react-helmet-async`:
```tsx
import { Helmet } from "react-helmet-async";

// Add Helmet component at the top of your JSX return
<Helmet>
    <title>Page Title | InstantSiteBuilders</title>
    <meta name="description" content="..." />
    <link rel="canonical" href="https://instantsitebuilders.com/[route]" />
    <!-- Add OpenGraph and Twitter tags -->
</Helmet>
```

## 2. Add Route in App.tsx
```tsx
import NewPage from "@/pages/new-page";
// Add in Switch component:
<Route path="/new-route" component={NewPage} />
```

## 3. Update sitemap.xml
Add entry in `client/public/sitemap.xml`:
```xml
<url>
  <loc>https://instantsitebuilders.com/new-route</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## 4. If Page Has an API Endpoint

### For Local Development (server/routes.ts)
Add route using Express:
```typescript
app.post("/api/endpoint", async (req, res) => { ... });
```

### For Vercel Production (api/index.ts) - CRITICAL!
Add endpoint in the serverless function handler:
```typescript
if (pathname === '/endpoint' && req.method === 'POST') {
  // Handle the request
}
```

**Important:** Vercel uses `api/index.ts` serverless function, NOT the Express server!

## 5. File Uploads on Vercel
- Use `busboy` for multipart parsing (NOT formidable/multer)
- Stream to memory buffer, don't write to filesystem
- Add file size limits in busboy config

## 6. SPA Routing (vercel.json)
Already configured with rewrites to serve `index.html` for all client-side routes:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index" },
    { "source": "/((?!assets|.*\\.)(.*)", "destination": "/index.html" }
  ]
}
```
