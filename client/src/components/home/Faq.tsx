import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion";

/** Rendered on the page AND used to generate the FAQPage JSON-LD in home.tsx —
 *  Google requires the schema to match visible content. */
export const faqs = [
  {
    question: "How much does a small business website cost?",
    answer:
      "Our Starter Site is completely free — up to 5 pages, mobile-friendly, with a contact form. If you need more, the Growth Site is a $399 one-time fee and a fully custom build with booking or e-commerce is $799 one-time. Hosting is billed separately on paid plans, and there are no monthly design fees or contracts.",
  },
  {
    question: "Is the free website really free? What's the catch?",
    answer:
      "Yes — the Starter Site costs nothing to design and launch. There's no catch and no obligation: we build free starter sites because many owners later upgrade to a Growth or Custom plan once their business takes off. If you never upgrade, your free site is still yours.",
  },
  {
    question: "How long does it take to build my website?",
    answer:
      "Most websites go live within 48 hours of receiving your business details. Larger custom builds with booking systems or online stores can take longer, and we'll give you a clear timeline up front.",
  },
  {
    question: "Do I need to provide content, photos, or a design?",
    answer:
      "No. Tell us about your business in one short form and we handle the rest — layout, copywriting, stock photography, and design. If you have your own photos, logo, or brand colors, we'll gladly use them.",
  },
  {
    question: "Will my website show up on Google search?",
    answer:
      "Every site we build includes SEO fundamentals: fast loading, mobile-friendly design, proper page titles and descriptions, and a sitemap submitted to Google. The Growth plan adds local SEO setup so you rank for searches in your area.",
  },
  {
    question: "Can I update my website after it launches?",
    answer:
      "Yes. Growth and Custom sites include easy content editing so you can change text, photos, and hours yourself — no developer needed. On the free Starter plan, just email us small updates and we'll handle them.",
  },
  {
    question: "I already have a website — can you redesign it?",
    answer:
      "Absolutely. We redesign outdated websites all the time — keeping your domain and content while giving you a modern, mobile-ready design that loads fast and ranks better. Send us your current site and we'll show you what it could look like.",
  },
] as const;

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Questions, answered
          </h2>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="glass rounded-xl px-6 border-white/10"
              >
                <AccordionTrigger className="text-left text-white hover:text-lime-400 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
