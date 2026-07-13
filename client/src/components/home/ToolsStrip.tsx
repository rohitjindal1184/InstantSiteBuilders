import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const tools = [
  { href: "/convert-pdf-to-markdown", label: "PDF to Markdown" },
  { href: "/convert-html-to-markdown", label: "HTML to Markdown" },
  { href: "/convert-xml-to-markdown", label: "XML to Markdown" },
  { href: "/convert-json-to-markdown", label: "JSON to Markdown" },
  { href: "/convert-rtf-to-markdown", label: "RTF to Markdown" },
  { href: "/convert-webpage-to-markdown", label: "Webpage to Markdown" },
  { href: "/sitemap-validator", label: "Sitemap Validator" },
  { href: "/sitemap-generator", label: "XML Sitemap Generator" },
  { href: "/sitemap-extractor", label: "Sitemap URL Extractor" },
  { href: "/email-signature-generator", label: "Email Signature Generator" },
  { href: "/ai-reply-generator", label: "AI Email Reply Generator" },
  { href: "/ai-prompt-generator", label: "AI Prompt Generator" },
] as const;

export default function ToolsStrip() {
  return (
    <section className="py-20 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Free tools
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight">
            Free web tools, on the house
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">
            The same utilities we use when building client sites — converters,
            sitemap tools, and AI generators. No sign-up required.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <StaggerItem key={tool.href}>
              <Link
                href={tool.href}
                className="glass rounded-xl px-4 py-3.5 flex items-center justify-between gap-2 text-sm text-zinc-300 hover:text-white hover:border-lime-400/30 transition-colors duration-200 group h-full"
              >
                {tool.label}
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-lime-400 transition-colors flex-shrink-0" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
