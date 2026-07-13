import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Sparkles,
  Instagram,
  Facebook,
  ChevronDown,
} from "lucide-react";
import { demos } from "@/data/demos";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const salon = demos.salon;

const priceMenu = [
  {
    category: "Hair",
    items: [
      { name: "Women's cut & style", price: "$65+" },
      { name: "Men's cut", price: "$40" },
      { name: "Balayage / highlights", price: "$140+" },
      { name: "Full color", price: "$95+" },
      { name: "Blowout & finish", price: "$45" },
    ],
  },
  {
    category: "Nails",
    items: [
      { name: "Classic manicure", price: "$30" },
      { name: "Gel manicure", price: "$45" },
      { name: "Spa pedicure", price: "$55" },
      { name: "Nail art (per nail)", price: "$5+" },
      { name: "Polish change", price: "$18" },
    ],
  },
  {
    category: "Spa & Beauty",
    items: [
      { name: "Signature facial", price: "$85" },
      { name: "Deep-cleanse facial", price: "$110" },
      { name: "Brow shaping & tint", price: "$38" },
      { name: "Lash lift", price: "$70" },
      { name: "Bridal package", price: "$220+" },
    ],
  },
] as const;

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "The studio floor",
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "Color & styling",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "Makeup artistry",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "Nail bar",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "Spa & facials",
  },
  {
    src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    caption: "Finishing touches",
  },
] as const;

const team = [
  {
    name: "Luna Reyes",
    role: "Founder · Master Colorist",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
  },
  {
    name: "Maya Chen",
    role: "Senior Stylist",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
  },
  {
    name: "Sofia Alvarez",
    role: "Nail Artist",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
  },
  {
    name: "Emma Brooks",
    role: "Esthetician",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
  },
] as const;

const marqueeItems = [
  "Hair Color",
  "Balayage",
  "Bridal Styling",
  "Gel Manicure",
  "Spa Pedicure",
  "Signature Facials",
  "Lash Lifts",
  "Brow Artistry",
] as const;

const navLinks = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit" },
] as const;

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Soft rose gradient blob that drifts slowly. Static under reduced motion. */
function FloatingBlob({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className} aria-hidden="true" />;
  }
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Marquee() {
  const reduced = useReducedMotion();
  const row = (keyPrefix: string) =>
    marqueeItems.map((item) => (
      <span
        key={`${keyPrefix}-${item}`}
        className="flex items-center gap-6 sm:gap-8 shrink-0"
      >
        <span className="font-serif italic text-xl sm:text-2xl text-rose-100">
          {item}
        </span>
        <Sparkles className="w-4 h-4 text-rose-300/70" aria-hidden="true" />
      </span>
    ));

  return (
    <div className="bg-rose-950 py-5 overflow-hidden" aria-hidden="true">
      {reduced ? (
        <div className="flex gap-6 sm:gap-8 justify-center flex-wrap px-4">
          {row("static")}
        </div>
      ) : (
        <motion.div
          className="flex gap-6 sm:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {row("a")}
          {row("b")}
        </motion.div>
      )}
    </div>
  );
}

export default function SalonDemo() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const heroStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };
  const heroItem = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-gray-900">
      <Helmet>
        <title>{salon.name} — Sample Salon Website Demo</title>
        <meta
          name="description"
          content={`See what a professionally designed salon website looks like. ${salon.tagline}`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Announcement bar */}
      <div className="bg-zinc-950 text-white text-center text-xs sm:text-sm py-2 px-4 relative z-50">
        Sample demo site by{" "}
        <Link href="/" className="underline font-medium underline-offset-2">
          InstantSiteBuilders
        </Link>
        . Want one for your business?{" "}
        <Link href="/#contact" className="underline font-medium underline-offset-2">
          Get started free
        </Link>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 bg-[#FFF9F7]/90 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <button onClick={() => goTo("top")} className="text-left">
            <span className="font-serif italic text-2xl text-rose-700">
              Luna Glow
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-rose-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => goTo("visit")}
            className="bg-rose-700 hover:bg-rose-800 text-white rounded-full px-6 font-semibold"
          >
            {salon.cta}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        ref={heroRef}
        className="relative min-h-[88vh] flex items-center overflow-hidden text-white"
      >
        <motion.img
          src={salon.heroImage}
          alt=""
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={reduced ? undefined : { y: heroImageY }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/85 via-rose-900/70 to-rose-950/85" />

        <FloatingBlob className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-400/20 blur-[100px]" />
        <FloatingBlob
          className="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full bg-pink-300/15 blur-[110px]"
          delay={2.5}
        />

        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full"
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          <motion.p
            variants={heroItem}
            className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-rose-200 mb-6 font-medium"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Hair · Nails · Spa
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="font-serif text-5xl md:text-7xl leading-[1.08] max-w-3xl mb-6"
          >
            Where beauty feels{" "}
            <em className="italic text-rose-200">effortless.</em>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-rose-50/90 leading-relaxed max-w-xl mb-10"
          >
            {salon.tagline}. A calm, modern studio in the heart of Riverside —
            walk out feeling like the best version of yourself.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button
              size="lg"
              onClick={() => goTo("visit")}
              className="bg-white text-rose-900 hover:bg-rose-50 rounded-full px-8 py-6 text-base font-semibold"
            >
              {salon.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => goTo("services")}
              className="rounded-full px-8 py-6 text-base font-semibold border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-sm"
            >
              View Services & Prices
            </Button>
          </motion.div>
          <motion.div
            variants={heroItem}
            className="grid grid-cols-3 gap-4 max-w-md pt-8 border-t border-white/20"
          >
            {salon.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl text-white">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-rose-100/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {!reduced && (
          <motion.button
            onClick={() => goTo("services")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to services"
          >
            <ChevronDown className="w-7 h-7" />
          </motion.button>
        )}
      </section>

      <Marquee />

      {/* Services & price menu */}
      <section id="services" className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBlob
          className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-rose-200/40 blur-[100px]"
          delay={1}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600 mb-4">
              Services & Prices
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
              The menu
            </h2>
            <p className="text-lg text-gray-600">
              Transparent pricing, no surprises. Every service starts with a
              consultation so we get it exactly right.
            </p>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {priceMenu.map((section) => (
              <StaggerItem key={section.category}>
                <motion.div
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bg-white rounded-3xl border border-rose-100 shadow-lg shadow-rose-100/50 p-8 h-full"
                >
                  <h3 className="font-serif italic text-2xl text-rose-700 mb-6">
                    {section.category}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <span className="shrink-0 border-b border-dotted border-rose-200 flex-1" />
                        <span className="font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600 mb-4">
              Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
              Inside the studio
            </h2>
            <p className="text-lg text-gray-600">
              A look at the space, the work, and the little details in between.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((photo) => (
              <StaggerItem key={photo.src}>
                <div className="group relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src={photo.src}
                    alt={`${photo.caption} at ${salon.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="absolute bottom-4 left-4 font-serif italic text-white text-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {photo.caption}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBlob
          className="absolute -bottom-20 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-[100px]"
          delay={3}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600 mb-4">
              The Team
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
              The artists behind the glow
            </h2>
            <p className="text-lg text-gray-600">
              Nine stylists, colorists, and estheticians — each with their own
              specialty, all obsessed with the details.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <motion.div
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-lg shadow-rose-100/50"
                >
                  <div className="aspect-[6/7] overflow-hidden">
                    <img
                      src={member.img}
                      alt={`${member.name}, ${member.role} at ${salon.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-serif text-lg text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-sm text-rose-600">{member.role}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 md:py-28 bg-rose-950 text-white relative overflow-hidden">
        <FloatingBlob className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-rose-500/15 blur-[100px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-300 mb-4">
              Reviews
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Loved by Riverside
            </h2>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-300 fill-amber-300" />
              ))}
              <span className="ml-2 text-rose-100/80 text-sm">
                4.8 from 5,000+ clients
              </span>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {salon.testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-300 fill-amber-300"
                      />
                    ))}
                  </div>
                  <p className="font-serif italic text-lg text-rose-50 leading-relaxed mb-6 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-sm font-semibold shrink-0">
                      {t.initials}
                    </div>
                    <span className="text-sm font-medium text-rose-100">
                      {t.name}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Visit / booking */}
      <section id="visit" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600 mb-4">
              Visit Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
              Your chair is waiting
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Book online in under a minute, or call and we'll find a time that
              works. Walk-ins welcome when the chairs are free.
            </p>
            <div className="space-y-4 mb-10">
              <p className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0" />
                {salon.address}
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-rose-600 shrink-0" />
                {salon.hours}
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-rose-600 shrink-0" />
                {salon.phone}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-rose-700 hover:bg-rose-800 text-white rounded-full px-8 py-6 text-base font-semibold"
              >
                {salon.cta}
              </Button>
              <a href={`tel:${salon.phone.replace(/[^\d+]/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call {salon.phone}
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-rose-200 to-pink-100 rounded-[2rem] rotate-2"
                aria-hidden="true"
              />
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900"
                alt={`The welcoming interior of ${salon.name}`}
                loading="lazy"
                className="relative rounded-3xl w-full aspect-[8/9] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-950 text-rose-100/80 py-14 px-4">
        <div className="max-w-6xl mx-auto sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <span className="font-serif italic text-2xl text-white">
              Luna Glow
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {salon.address}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {salon.hours}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {salon.phone}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
                aria-label="Instagram (demo)"
              >
                <Instagram className="w-4 h-4" />
              </span>
              <span
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
                aria-label="Facebook (demo)"
              >
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-rose-100/50 mb-4">
              This is a sample website demo — not a real business.
            </p>
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Back to InstantSiteBuilders
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
