import { Link } from "wouter";
import { Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoPath from "@assets/logo.png";
import { scrollToSection } from "./scroll";

const markdownTools = [
  { href: "/convert-pdf-to-markdown", label: "PDF to Markdown" },
  { href: "/convert-html-to-markdown", label: "HTML to Markdown" },
  { href: "/convert-xml-to-markdown", label: "XML to Markdown" },
  { href: "/convert-json-to-markdown", label: "JSON to Markdown" },
  { href: "/convert-rtf-to-markdown", label: "RTF to Markdown" },
  { href: "/convert-webpage-to-markdown", label: "Webpage to Markdown" },
] as const;

const otherTools = [
  { href: "/sitemap-validator", label: "Sitemap Validator" },
  { href: "/sitemap-generator", label: "XML Sitemap Generator" },
  { href: "/sitemap-extractor", label: "Sitemap URL Extractor" },
  { href: "/email-signature-generator", label: "Email Signature Generator" },
  { href: "/ai-reply-generator", label: "AI Email Reply Generator" },
  { href: "/ai-prompt-generator", label: "AI Prompt Generator" },
] as const;

const quickLinks = [
  { id: "features", label: "Why Us" },
  { id: "examples", label: "Examples" },
  { id: "services", label: "Pricing" },
  { id: "testimonials", label: "Success Stories" },
  { id: "contact", label: "Contact" },
] as const;

export default function FooterDark() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src={logoPath}
                alt="InstantSiteBuilders Logo"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
              Professional websites for small businesses — built for you, live
              in 48 hours, and free to get started. Stop losing customers to
              competitors who already show up online.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-zinc-500 hover:text-lime-400 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Convert to Markdown
            </h4>
            <ul className="space-y-2">
              {markdownTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Other Tools
            </h4>
            <ul className="space-y-2">
              {otherTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a
                  href="mailto:hello@instantsitebuilders.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  hello@instantsitebuilders.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                Response time: 24 hours
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} InstantSiteBuilders. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => scrollToSection("features")}
              className="text-zinc-500 hover:text-white text-sm transition-colors duration-200"
            >
              About
            </button>
            <Link
              href="/terms"
              className="text-zinc-500 hover:text-white text-sm transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
