import {
  UtensilsCrossed,
  Scissors,
  Wrench,
  Dumbbell,
  Stethoscope,
  TreePine,
  Users,
  Clock as ClockIcon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  initials: string;
  quote: string;
  rating: number;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Demo {
  slug: string;
  label: string;
  icon: LucideIcon;
  fakeDomain: string;
  name: string;
  tagline: string;
  heroImage: string;
  accent: string;
  accentText: string;
  heroBg: string;
  soft: string;
  cta: string;
  services: string[];
  hours: string;
  phone: string;
  address: string;
  about: string;
  stats: StatItem[];
  whyUs: WhyUsItem[];
  testimonials: Testimonial[];
}

export const demos = {
  restaurant: {
    slug: "restaurant",
    label: "Restaurant",
    icon: UtensilsCrossed,
    fakeDomain: "harvesttablebistro.com",
    name: "Harvest Table Bistro",
    tagline: "Fresh local food, warm atmosphere, easy online reservations",
    heroImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-amber-600 hover:bg-amber-700",
    accentText: "text-amber-600",
    heroBg: "from-amber-900/80 to-amber-950/90",
    soft: "bg-amber-50",
    cta: "Book a Table",
    services: ["Seasonal lunch menu", "Private dining", "Takeout & delivery"],
    hours: "Tue–Sun · 11am–10pm",
    phone: "(555) 214-8890",
    address: "124 Main Street, Riverside",
    about:
      "Harvest Table Bistro brings farm-to-table dining to Riverside — locally sourced ingredients, a menu that changes with the season, and a dining room built for long, easy evenings with people you love.",
    stats: [
      { value: "12", label: "Years serving Riverside" },
      { value: "4.9★", label: "Average rating" },
      { value: "30+", label: "Seasonal dishes" },
    ],
    whyUs: [
      {
        icon: UtensilsCrossed,
        title: "Farm-to-table menu",
        desc: "Ingredients sourced from local farms, changed with the seasons.",
      },
      {
        icon: Users,
        title: "Private dining",
        desc: "Book our back room for parties, rehearsal dinners, and celebrations.",
      },
      {
        icon: ClockIcon,
        title: "Easy reservations",
        desc: "Book a table online in under a minute, any night of the week.",
      },
    ],
    testimonials: [
      { name: "Maria D.", initials: "MD", quote: "Best patio in Riverside. We come every Sunday.", rating: 5 },
      { name: "James K.", initials: "JK", quote: "The seasonal menu never gets old — always something new to try.", rating: 5 },
      { name: "Priya S.", initials: "PS", quote: "Hosted our anniversary dinner here. Impeccable service.", rating: 5 },
    ],
  },
  salon: {
    slug: "salon",
    label: "Salon",
    icon: Scissors,
    fakeDomain: "lunaglowsalon.com",
    name: "Luna Glow Salon",
    tagline: "Hair, nails, and spa services — book in minutes from your phone",
    heroImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-rose-600 hover:bg-rose-700",
    accentText: "text-rose-600",
    heroBg: "from-rose-900/80 to-rose-950/90",
    soft: "bg-rose-50",
    cta: "Book Appointment",
    services: ["Cuts & color", "Blowouts", "Manicures & facials"],
    hours: "Mon–Sat · 9am–7pm",
    phone: "(555) 903-4412",
    address: "88 Oak Avenue, Riverside",
    about:
      "Luna Glow Salon is Riverside's go-to for hair, nails, and spa treatments — a calm, modern space where the team treats every visit like a reset button.",
    stats: [
      { value: "9", label: "Stylists on staff" },
      { value: "4.8★", label: "Client rating" },
      { value: "5,000+", label: "Happy clients" },
    ],
    whyUs: [
      {
        icon: Scissors,
        title: "Expert stylists",
        desc: "Continuing education every season, so your look always feels current.",
      },
      {
        icon: Users,
        title: "Modern, calm space",
        desc: "A welcoming studio designed around your relaxation.",
      },
      {
        icon: ClockIcon,
        title: "Book in seconds",
        desc: "Real-time online booking that fits your schedule, not ours.",
      },
    ],
    testimonials: [
      { name: "Ava R.", initials: "AR", quote: "My colorist actually listens. Best cut I've had in years.", rating: 5 },
      { name: "Sophia L.", initials: "SL", quote: "The spa facial is worth every minute. So relaxing.", rating: 5 },
      { name: "Grace T.", initials: "GT", quote: "Booking online is so easy, and they're never late.", rating: 5 },
    ],
  },
  contractor: {
    slug: "contractor",
    label: "Contractor",
    icon: Wrench,
    fakeDomain: "premierhomeservices.com",
    name: "Premier Home Services",
    tagline: "Licensed trades you can trust — fast quotes, clear pricing",
    heroImage:
      "https://images.unsplash.com/photo-1504307653784-414bc1655797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-blue-700 hover:bg-blue-800",
    accentText: "text-blue-700",
    heroBg: "from-slate-900/85 to-blue-950/90",
    soft: "bg-blue-50",
    cta: "Request a Quote",
    services: ["Plumbing repairs", "Electrical work", "Kitchen & bath remodels"],
    hours: "Mon–Fri · 7am–6pm",
    phone: "(555) 672-3301",
    address: "Serving Riverside & nearby towns",
    about:
      "Premier Home Services is a licensed team of plumbers, electricians, and remodelers serving Riverside and nearby towns — clear pricing, quality work, and a crew that shows up when they say they will.",
    stats: [
      { value: "18", label: "Years in business" },
      { value: "2,400+", label: "Jobs completed" },
      { value: "Licensed", label: "& fully insured" },
    ],
    whyUs: [
      {
        icon: ShieldCheck,
        title: "Licensed & insured",
        desc: "Every technician is licensed, background-checked, and insured.",
      },
      {
        icon: Wrench,
        title: "Upfront pricing",
        desc: "A clear quote before we start — no surprise charges after the job.",
      },
      {
        icon: ClockIcon,
        title: "Fast response",
        desc: "Same-week appointments for most repairs and remodel consults.",
      },
    ],
    testimonials: [
      { name: "Tom B.", initials: "TB", quote: "Fixed our kitchen plumbing same day. Fair price, no upsell.", rating: 5 },
      { name: "Linda H.", initials: "LH", quote: "Remodeled our bathroom on time and on budget. Highly recommend.", rating: 5 },
      { name: "Carlos M.", initials: "CM", quote: "Professional crew, cleaned up after every visit.", rating: 5 },
    ],
  },
  gym: {
    slug: "gym",
    label: "Gym",
    icon: Dumbbell,
    fakeDomain: "ironandoakfitness.com",
    name: "Iron & Oak Fitness",
    tagline: "Strength training, classes, and coaching — your first week is free",
    heroImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-emerald-600 hover:bg-emerald-700",
    accentText: "text-emerald-600",
    heroBg: "from-emerald-950/85 to-zinc-950/90",
    soft: "bg-emerald-50",
    cta: "Start Free Trial",
    services: ["Group classes", "Personal training", "Open gym 24/7"],
    hours: "Open 24/7 · Staffed 6am–9pm",
    phone: "(555) 480-2214",
    address: "310 Commerce Way, Riverside",
    about:
      "Iron & Oak Fitness is a strength-first gym in Riverside built for people who want real coaching, real community, and equipment that's always ready to go.",
    stats: [
      { value: "24/7", label: "Gym access" },
      { value: "40+", label: "Classes weekly" },
      { value: "15", label: "Certified coaches" },
    ],
    whyUs: [
      {
        icon: Dumbbell,
        title: "Certified coaching",
        desc: "Every trainer is certified and focused on your form, not just reps.",
      },
      {
        icon: Users,
        title: "Real community",
        desc: "Group classes that push you further than training alone.",
      },
      {
        icon: ClockIcon,
        title: "Open 24/7",
        desc: "Key-fob access around the clock, staffed during peak hours.",
      },
    ],
    testimonials: [
      { name: "Derek W.", initials: "DW", quote: "Lost 30 lbs in 6 months with their coaching program.", rating: 5 },
      { name: "Nina P.", initials: "NP", quote: "The 6am class community keeps me accountable every day.", rating: 5 },
      { name: "Marcus J.", initials: "MJ", quote: "Best equipment and cleanest gym I've trained at.", rating: 5 },
    ],
  },
  dentist: {
    slug: "dentist",
    label: "Dentist",
    icon: Stethoscope,
    fakeDomain: "brightsidedental.com",
    name: "Brightside Dental",
    tagline: "Gentle, modern dentistry for the whole family — same-week visits",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-sky-600 hover:bg-sky-700",
    accentText: "text-sky-600",
    heroBg: "from-sky-900/80 to-slate-950/90",
    soft: "bg-sky-50",
    cta: "Book a Checkup",
    services: ["Cleanings & exams", "Cosmetic dentistry", "Emergency care"],
    hours: "Mon–Fri · 8am–5pm",
    phone: "(555) 318-7702",
    address: "52 Harbor Plaza, Riverside",
    about:
      "Brightside Dental offers gentle, modern dental care for the whole family in Riverside — same-week appointments, a calm office, and a team that actually explains what's going on.",
    stats: [
      { value: "20", label: "Years in practice" },
      { value: "4.9★", label: "Patient rating" },
      { value: "Same-week", label: "appointments" },
    ],
    whyUs: [
      {
        icon: Stethoscope,
        title: "Gentle, modern care",
        desc: "Comfort-focused dentistry with the latest imaging and techniques.",
      },
      {
        icon: Users,
        title: "Family friendly",
        desc: "From first checkups to wisdom teeth, we treat every age.",
      },
      {
        icon: ClockIcon,
        title: "Same-week visits",
        desc: "Emergency and routine appointments, usually within days.",
      },
    ],
    testimonials: [
      { name: "Rachel F.", initials: "RF", quote: "First dentist that's ever made my kids excited to go.", rating: 5 },
      { name: "Omar S.", initials: "OS", quote: "Got me in same-day for a toothache. Painless and quick.", rating: 5 },
      { name: "Ellen K.", initials: "EK", quote: "Friendly staff, no wait times, spotless office.", rating: 5 },
    ],
  },
  landscaping: {
    slug: "landscaping",
    label: "Landscaping",
    icon: TreePine,
    fakeDomain: "evergreenlawncare.com",
    name: "Evergreen Lawn & Landscape",
    tagline: "Beautiful yards, year-round care — free on-site estimates",
    heroImage:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900",
    accent: "bg-green-700 hover:bg-green-800",
    accentText: "text-green-700",
    heroBg: "from-green-950/85 to-zinc-950/90",
    soft: "bg-green-50",
    cta: "Get a Free Estimate",
    services: ["Lawn care & mowing", "Garden design", "Seasonal cleanups"],
    hours: "Mon–Sat · 7am–6pm",
    phone: "(555) 764-9908",
    address: "Serving Riverside & nearby towns",
    about:
      "Evergreen Lawn & Landscape keeps Riverside's yards looking their best year-round — mowing, garden design, and seasonal cleanups from a crew that treats your yard like their own.",
    stats: [
      { value: "14", label: "Years landscaping" },
      { value: "600+", label: "Yards maintained" },
      { value: "Free", label: "on-site estimates" },
    ],
    whyUs: [
      {
        icon: TreePine,
        title: "Year-round care",
        desc: "Mowing, planting, and cleanups scheduled to match every season.",
      },
      {
        icon: ShieldCheck,
        title: "Reliable crews",
        desc: "The same trained crew visits your property every time.",
      },
      {
        icon: ClockIcon,
        title: "Free estimates",
        desc: "A same-week, no-obligation quote for any size property.",
      },
    ],
    testimonials: [
      { name: "Bill H.", initials: "BH", quote: "Our yard has never looked better. Worth every penny.", rating: 5 },
      { name: "Sandra V.", initials: "SV", quote: "Reliable, on schedule every week, no reminders needed.", rating: 5 },
      { name: "Kevin O.", initials: "KO", quote: "Redesigned our garden beds — neighbors keep asking who did it.", rating: 5 },
    ],
  },
} satisfies Record<string, Demo>;

export type DemoSlug = keyof typeof demos;

export const demoSlugs = Object.keys(demos) as DemoSlug[];
