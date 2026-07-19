// Postbuild step: this app is a client-rendered SPA (no SSR), so every request
// resolves to the same dist/public/index.html. Crawlers that don't execute JS
// (social share unfurlers, some search bots) never see the per-page <title>/
// description/canonical that react-helmet-async sets client-side — they all get
// the homepage's tags. This script writes a static index.html per route with the
// right tags baked in; Vercel serves a matching static file before falling back
// to the SPA rewrite, so the fix is transparent to the React app itself.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { routes } from "./seo-routes.mjs";

const outDir = join(import.meta.dirname, "..", "dist", "public");
const template = readFileSync(join(outDir, "index.html"), "utf8");

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender-seo: expected pattern not found: ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

for (const route of routes) {
  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = replaceTag(
    html,
    /<meta name="description"[^>]*\/>/,
    `<meta name="description" content="${route.description}" />`,
  );
  html = replaceTag(
    html,
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${route.canonical}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${route.title}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:description"[^>]*\/>/,
    `<meta property="og:description" content="${route.description}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:url"[^>]*\/>/,
    `<meta property="og:url" content="${route.canonical}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description"[^>]*\/>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  );

  const routeDir = join(outDir, route.path);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), html);
}

// Homepage canonical should carry the trailing slash to match the client-side
// tag react-helmet-async renders on Home (client/src/pages/home.tsx).
const homeHtml = template.replace(
  '<link rel="canonical" href="https://instantsitebuilders.com" />',
  '<link rel="canonical" href="https://instantsitebuilders.com/" />',
);
writeFileSync(join(outDir, "index.html"), homeHtml);

console.log(`prerender-seo: generated ${routes.length} static route shells`);
