import { Helmet } from "react-helmet-async";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import IndustryShowcase from "@/components/home/IndustryShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import Pricing, { services } from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import Faq, { faqs } from "@/components/home/Faq";
import ToolsStrip from "@/components/home/ToolsStrip";
import ContactSection from "@/components/home/ContactSection";
import FooterDark from "@/components/home/FooterDark";

const SITE_URL = "https://instantsitebuilders.com";
const PAGE_TITLE =
  "Free Website Design for Small Business — Live in 48 Hours | InstantSiteBuilders";
const PAGE_DESCRIPTION =
  "Get a professional website designed free for your small business. Mobile-ready, SEO-optimized, and live in 48 hours. See real examples for restaurants, salons, gyms, contractors & more.";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Small Business Website Design",
  serviceType: "Website Design",
  description: PAGE_DESCRIPTION,
  provider: {
    "@type": "Organization",
    name: "InstantSiteBuilders",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  offers: services.map((service) => ({
    "@type": "Offer",
    name: service.name,
    price: service.priceValue,
    priceCurrency: "USD",
    description: service.description,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="keywords"
          content="free website design for small business, small business website design, affordable website design, professional web design, website in 48 hours, get a website for my business, local business website"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Nav />
      <Hero />
      <IndustryShowcase />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <ToolsStrip />
      <ContactSection />
      <FooterDark />
    </main>
  );
}
