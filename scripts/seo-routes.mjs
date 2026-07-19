// Single source of truth for per-route SEO metadata used by scripts/prerender-seo.mjs.
// Mirrors the react-helmet-async tags each page sets client-side, so non-JS crawlers
// (social unfurlers, some search bots) see the same title/description/canonical as
// a JS-rendering crawler would. Keep in sync with the corresponding page component.
const SITE_URL = "https://instantsitebuilders.com";

export const routes = [
  {
    path: "/terms",
    title: "Terms of Use | InstantSiteBuilders",
    description:
      "Terms of Use for InstantSiteBuilders. Read about our service terms, user responsibilities, and legal agreements.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | InstantSiteBuilders",
    description:
      "Privacy Policy for InstantSiteBuilders. Learn how we collect, use, and protect your personal information.",
  },
  {
    path: "/convert-pdf-to-markdown",
    title: "Free PDF to Markdown Converter Online | InstantSiteBuilders",
    description:
      "Convert PDF documents to Markdown instantly. Free online tool, no sign-up required. Perfect for documentation, note-taking, and content migration. Fast, secure, and easy to use.",
  },
  {
    path: "/convert-html-to-markdown",
    title: "Free HTML to Markdown Converter Online | InstantSiteBuilders",
    description:
      "Convert HTML to Markdown instantly. Free online tool, no sign-up required. Perfect for documentation, blog migration, and content conversion. Fast, secure, and easy to use.",
  },
  {
    path: "/convert-xml-to-markdown",
    title: "Free XML to Markdown Converter Online | InstantSiteBuilders",
    description:
      "Convert XML to Markdown instantly. Free online tool, no sign-up required. Perfect for documentation, data conversion, and content migration. Fast, secure, and easy to use.",
  },
  {
    path: "/convert-json-to-markdown",
    title: "Free JSON to Markdown Converter Online | InstantSiteBuilders",
    description:
      "Convert JSON to Markdown instantly. Transform arrays to tables and objects to lists. Free online tool, no sign-up required. Perfect for documentation and data visualization.",
  },
  {
    path: "/convert-rtf-to-markdown",
    title: "Free RTF to Markdown Converter Online | InstantSiteBuilders",
    description:
      "Convert RTF to Markdown instantly. Transform Rich Text Format documents to clean Markdown. Free online tool, no sign-up required. Perfect for documentation and content migration.",
  },
  {
    path: "/convert-webpage-to-markdown",
    title: "Free Webpage to Markdown Converter | InstantSiteBuilders",
    description:
      "Convert any webpage to Markdown instantly. Extract content from URLs to cleaner Markdown format. Free online tool, no sign-up required.",
  },
  {
    path: "/sitemap-validator",
    title: "Free XML Sitemap Validator Online | InstantSiteBuilders",
    description:
      "Validate your XML sitemap instantly. Check for errors, broken links, and structural issues. Free online tool for SEO optimization.",
  },
  {
    path: "/sitemap-generator",
    title: "Free XML Sitemap Generator | InstantSiteBuilders",
    description:
      "Generate XML sitemaps for your website instantly. Crawl your URL or paste links to create a Google-compatible sitemap. Free online SEO tool.",
  },
  {
    path: "/sitemap-extractor",
    title: "Free Sitemap URL Extractor | InstantSiteBuilders",
    description:
      "Extract all URLs from any XML sitemap instantly. Get a clean list of links from sitemaps or sitemap indexes. Free online SEO tool.",
  },
  {
    path: "/email-signature-generator",
    title: "Free Email Signature Generator | InstantSiteBuilders",
    description:
      "Create a professional email signature for free. Customize your design with our easy-to-use editor and copy to Gmail, Outlook, or Apple Mail.",
  },
  {
    path: "/ai-reply-generator",
    title: "Free AI Reply Generator | Email, Social Media & Text Response Tool",
    description:
      "Generate professional, friendly, or witty replies instantly with our free AI Reply Generator. Perfect for emails, LinkedIn, Twitter, and more using GPT-4o.",
  },
  {
    path: "/ai-prompt-generator",
    title: "Best AI Prompt Generator | APE, RACE & SPARK Framework Tools",
    description:
      "Create high-quality AI prompts using proven frameworks like APE, RACE, CREATE, and SPARK. Optimize your ChatGPT and Claude prompts for better results.",
  },
].map((route) => ({ ...route, canonical: `${SITE_URL}${route.path}` }));
