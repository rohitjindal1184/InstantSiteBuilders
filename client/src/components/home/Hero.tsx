import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { scrollToSection } from "./scroll";

const stats = [
  { value: "48 hrs", label: "from brief to live site" },
  { value: "$0", label: "to get started" },
  { value: "100%", label: "mobile-ready designs" },
] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative bg-[#0A0A0B] text-white overflow-hidden">
      {/* Backdrop: faint grid + accent glow */}
      <div className="absolute inset-0 bg-grid-faint" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-lime-400/15 blur-[140px] animate-glow-pulse"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium text-zinc-300">
              <Sparkles className="w-4 h-4 text-lime-400" />
              Studio-quality websites for small businesses
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            Free website design for small businesses that{" "}
            <span className="text-lime-400">refuse to look small.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            We design and build your website the way a high-end studio would —
            you just run your business. Live in 48 hours, zero tech skills
            needed, and free to start.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-lime-400 text-zinc-950 hover:bg-lime-300 rounded-full px-8 py-6 text-lg font-semibold group"
            >
              Get My Free Website
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToSection("examples")}
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              See Live Examples
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
