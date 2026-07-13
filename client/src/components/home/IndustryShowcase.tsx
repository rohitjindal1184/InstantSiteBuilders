import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Clock, ArrowRight } from "lucide-react";
import { demos, demoSlugs, type DemoSlug } from "@/data/demos";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "@/components/motion";
import { scrollToSection } from "./scroll";

function BrowserFrame({ domain, children }: { domain: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-lime-400/5">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 max-w-md mx-auto">
          <div className="bg-black/40 rounded-md px-3 py-1 text-xs text-zinc-400 text-center truncate">
            {domain}
          </div>
        </div>
        <div className="w-12" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

function DemoPreview({ slug }: { slug: DemoSlug }) {
  const demo = demos[slug];
  return (
    <div className="bg-white text-left">
      {/* Mini nav */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-gray-100">
        <span className={`text-sm sm:text-base font-bold ${demo.accentText}`}>
          {demo.name}
        </span>
        <span
          className={`${demo.accent.split(" ")[0]} text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded`}
        >
          {demo.cta}
        </span>
      </div>

      {/* Mini hero */}
      <div className="relative h-44 sm:h-60 overflow-hidden">
        <img
          src={demo.heroImage}
          alt={`${demo.label} website design example — ${demo.name}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${demo.heroBg}`} />
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-8">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 mb-1">
            Welcome
          </p>
          <p className="text-white font-bold text-lg sm:text-2xl mb-1.5">{demo.name}</p>
          <p className="text-white/85 text-xs sm:text-sm max-w-xs mb-3 line-clamp-2">
            {demo.tagline}
          </p>
          <span
            className={`${demo.accent.split(" ")[0]} text-white text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded w-fit`}
          >
            {demo.cta}
          </span>
        </div>
      </div>

      {/* Mini services + contact strip */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {demo.services.map((service) => (
            <span
              key={service}
              className="text-[10px] sm:text-xs text-gray-700 bg-gray-100 rounded-full px-2.5 py-1"
            >
              {service}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {demo.phone}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {demo.hours}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function IndustryShowcase() {
  const [active, setActive] = useState<DemoSlug>("restaurant");
  const reduced = useReducedMotion();
  const demo = demos[active];

  const handleTabClick = (slug: DemoSlug) => {
    setActive(slug);
    trackEvent("industry_switcher_tab", "engagement", slug);
  };

  const handleViewDemo = () => {
    trackEvent("example_card_cta_click", "engagement", demo.label);
    window.open(`/demos/${active}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="examples" className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Live examples
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            See what your website could look like
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Pick your industry. Every design below is a real, working sample —
            yours would be built around your business, your brand, your customers.
          </p>
        </Reveal>

        {/* Industry tabs */}
        <Reveal>
          <div
            className="flex md:justify-center gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0"
            role="tablist"
            aria-label="Choose your industry"
          >
            {demoSlugs.map((slug) => {
              const { icon: Icon, label } = demos[slug];
              const isActive = slug === active;
              return (
                <button
                  key={slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(slug)}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-zinc-950" : "text-zinc-400 hover:text-white glass"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="industry-pill"
                      className="absolute inset-0 rounded-full bg-lime-400"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Browser mockup */}
        <Reveal className="max-w-3xl mx-auto">
          <BrowserFrame domain={demo.fakeDomain}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <DemoPreview slug={active} />
              </motion.div>
            </AnimatePresence>
          </BrowserFrame>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              onClick={handleViewDemo}
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              View full {demo.label.toLowerCase()} demo
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold"
            >
              Want this for your business? Start free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
