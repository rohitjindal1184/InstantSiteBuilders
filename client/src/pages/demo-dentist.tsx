import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Baby,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gem,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { demos } from "@/data/demos";

const demo = demos.dentist;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (value) => {
        if (ref.current) {
          ref.current.textContent = value.toFixed(decimals) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

const services = [
  {
    icon: Stethoscope,
    title: "Cleanings & Exams",
    description:
      "Twice-a-year checkups with digital X-rays, oral cancer screening, and a gentle hygienist team.",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description:
      "In-office Zoom whitening or take-home trays — smiles up to 8 shades brighter in one visit.",
  },
  {
    icon: Gem,
    title: "Veneers & Cosmetic",
    description:
      "Porcelain veneers, bonding, and smile makeovers designed with 3D digital previews.",
  },
  {
    icon: ShieldCheck,
    title: "Implants & Crowns",
    description:
      "Permanent, natural-looking replacements with same-day CEREC crowns milled on site.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Kid-friendly visits from age one, sealants, and a prize wall that makes checkups fun.",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    description:
      "Toothache, chip, or knocked-out tooth? Same-day emergency slots held every weekday.",
  },
];

const team = [
  {
    name: "Dr. Maya Chen, DDS",
    role: "Lead Dentist · Cosmetic & Restorative",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    blurb: "15 years creating smiles. UCSF grad, invisible-aligner certified.",
  },
  {
    name: "Dr. James Okafor, DMD",
    role: "Implants & Oral Surgery",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    blurb: "Placed 2,000+ implants. Gentle-sedation specialist.",
  },
  {
    name: "Dr. Sofia Reyes, DDS",
    role: "Family & Pediatric Dentistry",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    blurb: "The dentist kids ask to come back to. Habla español.",
  },
];

const testimonials = [
  {
    quote:
      "I put off the dentist for six years out of fear. The team here was so patient and kind — I was in and out for a full cleaning without a single wince. I've already booked my whole family in.",
    name: "Rachel T.",
    detail: "New patient · Cleaning & exam",
  },
  {
    quote:
      "Chipped my front tooth on a Friday morning and they saw me at noon the same day. The repair is invisible — my own mother couldn't tell which tooth it was.",
    name: "Marcus D.",
    detail: "Emergency visit · Bonding",
  },
  {
    quote:
      "The 3D preview of my veneers sold me instantly. Eight weeks later my smile looks exactly like the preview. Worth every penny.",
    name: "Priya S.",
    detail: "Smile makeover · Veneers",
  },
  {
    quote:
      "My 4-year-old cried on the drive there and laughed the whole drive home. Dr. Reyes is magic with kids.",
    name: "Tom & Ana W.",
    detail: "Pediatric checkup",
  },
];

const insurers = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "Guardian",
  "Humana",
  "United Healthcare",
  "Principal",
];

const faqs = [
  {
    q: "Do you accept my insurance?",
    a: "We're in-network with most major PPO plans including Delta Dental, Cigna, Aetna, MetLife, and Guardian. Bring your card to your first visit — or call ahead and we'll verify your coverage for free before you're seen.",
  },
  {
    q: "I haven't been to a dentist in years. Will I be judged?",
    a: "Never. About a third of our new patients are returning after a long gap. Your first visit is a no-lecture, no-pressure exam where we simply map out where things stand and what your options are.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes — 0% in-house financing for treatment plans over $500, plus CareCredit. We'll always give you a written estimate before any work begins.",
  },
  {
    q: "How fast can I get an appointment?",
    a: "New patients are typically seen within the same week, and we hold same-day slots for emergencies every weekday. Book online or call before 10am for a same-day visit.",
  },
  {
    q: "Are you good with anxious patients or kids?",
    a: "It's our specialty. We offer noise-cancelling headphones, weighted blankets, nitrous oxide, and gentle-sedation options — and Dr. Reyes leads dedicated kids' visits with a show-tell-do approach.",
  },
];

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Our Team" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#book", label: "Contact" },
];

function DemoBanner() {
  return (
    <div className="bg-slate-900 text-white text-center text-sm py-2 px-4">
      Sample demo site by{" "}
      <Link href="/" className="underline font-medium">
        InstantSiteBuilders
      </Link>
      . Want one for your business?{" "}
      <Link href="/#contact" className="underline font-medium">
        Get started free
      </Link>
    </div>
  );
}

function FloatingOrb({
  className,
  duration = 9,
  y = 24,
}: {
  className: string;
  duration?: number;
  y?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [0, -y, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 60]);
  const textY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      <FloatingOrb className="w-96 h-96 bg-sky-300/40 -top-20 -left-20" />
      <FloatingOrb
        className="w-80 h-80 bg-cyan-300/30 top-40 right-0"
        duration={11}
        y={32}
      />
      <FloatingOrb
        className="w-64 h-64 bg-sky-200/50 bottom-0 left-1/3"
        duration={13}
        y={20}
      />

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ y: textY }}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-white shadow-sm border border-sky-100 rounded-full px-4 py-1.5 text-sm text-slate-700 mb-6"
          >
            <span className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </span>
            4.9 from 800+ patient reviews
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
          >
            A dentist visit you'll{" "}
            <span className="relative text-sky-600">
              actually enjoy
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full h-3 text-sky-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                <motion.path
                  d="M3 9C60 2 140 2 197 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 max-w-lg mb-8"
          >
            {demo.tagline}. Modern equipment, transparent pricing, and a team
            that treats you like family.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <a href="#book">
              <Button size="lg" className={`${demo.accent} text-white shadow-lg shadow-sky-600/25`}>
                <CalendarCheck className="w-5 h-5 mr-2" />
                {demo.cta}
              </Button>
            </a>
            <a href={`tel:${demo.phone.replace(/[^0-9]/g, "")}`}>
              <Button size="lg" variant="outline" className="border-slate-300">
                <Phone className="w-5 h-5 mr-2" />
                {demo.phone}
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Most PPO insurance accepted
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-600" /> Same-day emergencies
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/20 aspect-[4/3]">
            <img
              src={demo.heroImage}
              alt="Patient smiling in a modern dental chair"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/30 to-transparent" />
          </div>

          <motion.div
            className="absolute -left-4 md:-left-8 top-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-sky-100 text-sky-600 rounded-full p-2">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">12,000+</p>
              <p className="text-xs text-slate-500">smiles restored</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-3 md:-right-6 bottom-10 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Same-week</p>
              <p className="text-xs text-slate-500">new patient visits</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function InsuranceMarquee() {
  const row = [...insurers, ...insurers];
  return (
    <section className="bg-white border-y border-slate-100 py-6 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-4">
        In-network with most major insurance plans
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg font-semibold text-slate-400 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className={`text-sm font-semibold uppercase tracking-widest ${demo.accentText} mb-3`}>
            Complete care under one roof
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything your smile needs
          </h2>
          <p className="text-lg text-slate-600">
            From routine cleanings to full smile makeovers — no referrals, no
            running across town.
          </p>
        </Reveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-900/10 transition-shadow"
            >
              <div className="bg-sky-50 text-sky-600 rounded-xl w-12 h-12 flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 15, suffix: "+", label: "Years serving Riverside" },
    { value: 12, suffix: "k", label: "Smiles restored" },
    { value: 4.9, suffix: "", decimals: 1, label: "Average patient rating" },
    { value: 98, suffix: "%", label: "Would recommend us" },
  ];
  return (
    <section className="relative bg-sky-600 py-16 overflow-hidden">
      <FloatingOrb className="w-96 h-96 bg-sky-400/30 -top-40 right-10" duration={12} />
      <FloatingOrb className="w-72 h-72 bg-cyan-300/20 -bottom-24 left-16" duration={10} />
      <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center text-white">
        {stats.map((stat) => (
          <Reveal key={stat.label}>
            <p className="text-4xl md:text-5xl font-bold mb-2">
              <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
            </p>
            <p className="text-sky-100 text-sm md:text-base">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  const points = [
    "Digital X-rays with 90% less radiation",
    "Same-day CEREC crowns — one visit, no temporaries",
    "Noise-cancelling headphones & weighted blankets",
    "0% in-house financing on treatment plans",
    "Evening & Saturday appointments available",
  ];
  return (
    <section id="about" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <motion.img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900"
              alt="Dentist examining a patient in a bright modern operatory"
              className="w-full h-full object-cover"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
          <motion.div
            className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-xl px-5 py-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-2xl font-bold text-sky-600">Since 2011</p>
            <p className="text-xs text-slate-500">Family-owned & operated</p>
          </motion.div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className={`text-sm font-semibold uppercase tracking-widest ${demo.accentText} mb-3`}>
              Why Brightside
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
              Dentistry that puts you at ease
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              We built Brightside around one idea: nobody should dread the
              dentist. That means honest pricing before any work begins,
              gentle techniques, and technology that makes visits faster and
              more comfortable.
            </p>
          </Reveal>
          <motion.ul
            className="space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {points.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex items-start gap-3 text-slate-700"
              >
                <span className="bg-sky-100 text-sky-600 rounded-full p-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-20 md:py-28 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className={`text-sm font-semibold uppercase tracking-widest ${demo.accentText} mb-3`}>
            Meet the team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Doctors patients actually look forward to seeing
          </h2>
        </Reveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[6/7] overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className={`text-sm font-medium ${demo.accentText} mb-2`}>
                  {member.role}
                </p>
                <p className="text-sm text-slate-600">{member.blurb}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section
      id="reviews"
      className="relative py-20 md:py-28 bg-slate-900 text-white overflow-hidden scroll-mt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FloatingOrb className="w-96 h-96 bg-sky-500/20 -top-32 -right-20" duration={12} />
      <FloatingOrb className="w-80 h-80 bg-cyan-400/10 bottom-0 -left-24" duration={14} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Patient stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Don't take our word for it
          </h2>
        </Reveal>

        <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex justify-center text-amber-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-slate-100 mb-6">
                "{current.quote}"
              </p>
              <footer>
                <p className="font-semibold">{current.name}</p>
                <p className="text-sm text-slate-400">{current.detail}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            aria-label="Previous review"
            onClick={() =>
              setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
            }
            className="rounded-full border border-slate-700 p-2 hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-sky-400" : "w-2 bg-slate-600"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next review"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="rounded-full border border-slate-700 p-2 hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal className="text-center mb-12">
          <p className={`text-sm font-semibold uppercase tracking-widest ${demo.accentText} mb-3`}>
            Common questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything you're wondering
          </h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-slate-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Booking() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="book" className="py-20 md:py-28 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
        <div>
          <Reveal>
            <p className={`text-sm font-semibold uppercase tracking-widest ${demo.accentText} mb-3`}>
              Visit us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
              Ready for your brightest smile?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Request an appointment and our front desk will confirm within one
              business hour. New patients welcome — first exam includes free
              X-rays.
            </p>
          </Reveal>
          <Reveal className="space-y-5">
            <p className="flex items-start gap-3 text-slate-700">
              <span className="bg-sky-100 text-sky-600 rounded-lg p-2">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <strong className="block text-slate-900">Address</strong>
                {demo.address}
              </span>
            </p>
            <p className="flex items-start gap-3 text-slate-700">
              <span className="bg-sky-100 text-sky-600 rounded-lg p-2">
                <Clock className="w-5 h-5" />
              </span>
              <span>
                <strong className="block text-slate-900">Hours</strong>
                {demo.hours} · Sat 9am–2pm
              </span>
            </p>
            <p className="flex items-start gap-3 text-slate-700">
              <span className="bg-sky-100 text-sky-600 rounded-lg p-2">
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <strong className="block text-slate-900">Phone</strong>
                {demo.phone}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8" delay={0.15}>
          {submitted ? (
            <motion.div
              className="h-full flex flex-col items-center justify-center text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="bg-emerald-100 text-emerald-600 rounded-full p-4 mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              >
                <CalendarCheck className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Request received!
              </h3>
              <p className="text-slate-600 max-w-sm">
                This is a demo — on a real site, our front desk would call you
                within the hour to confirm your visit.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSubmitted(false)}
              >
                Send another request
              </Button>
            </motion.div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Request an appointment
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    id="demo-name"
                    required
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label htmlFor="demo-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="demo-service" className="block text-sm font-medium text-slate-700 mb-1.5">
                  What do you need?
                </label>
                <select
                  id="demo-service"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option>Cleaning & exam</option>
                  <option>Teeth whitening</option>
                  <option>Cosmetic consultation</option>
                  <option>Implants or crowns</option>
                  <option>Kids' appointment</option>
                  <option>Emergency — I'm in pain</option>
                </select>
              </div>
              <div>
                <label htmlFor="demo-date" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred day
                </label>
                <input
                  id="demo-date"
                  type="date"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className={`w-full ${demo.accent} text-white`}
                >
                  Request appointment
                </Button>
              </motion.div>
              <p className="text-xs text-slate-400 text-center">
                Demo form — no information is sent or stored.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="flex items-center gap-2 text-xl font-bold text-white mb-3">
            <Smile className="w-6 h-6 text-sky-400" />
            {demo.name}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Gentle, modern dentistry for the whole family in Riverside.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Quick links</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Hours</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Mon–Fri · 8am–5pm</li>
            <li>Sat · 9am–2pm</li>
            <li>Sun · Closed</li>
            <li className="text-sky-400">Same-day emergencies daily</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>{demo.address}</li>
            <li>{demo.phone}</li>
            <li>hello@{demo.fakeDomain}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 px-4 text-center text-sm text-slate-500">
        <p className="mb-3">
          This is a sample website demo — not a real business.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Back to InstantSiteBuilders
          </Button>
        </Link>
      </div>
    </footer>
  );
}

export default function DemoDentist() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>{demo.name} — Sample Dentist Website Demo</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <DemoBanner />

        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Smile className={`w-6 h-6 ${demo.accentText}`} />
              {demo.name}
            </a>
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#book">
              <Button className={`${demo.accent} text-white`}>{demo.cta}</Button>
            </a>
          </div>
        </header>

        <main id="top">
          <Hero />
          <InsuranceMarquee />
          <Services />
          <Stats />
          <About />
          <Team />
          <Testimonials />
          <Faq />
          <Booking />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
