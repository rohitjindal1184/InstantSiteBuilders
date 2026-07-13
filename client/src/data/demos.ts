import {
  UtensilsCrossed,
  Scissors,
  Wrench,
  Dumbbell,
  Stethoscope,
  TreePine,
  type LucideIcon,
} from "lucide-react";

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
  cta: string;
  services: string[];
  hours: string;
  phone: string;
  address: string;
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
    cta: "Book a Table",
    services: ["Seasonal lunch menu", "Private dining", "Takeout & delivery"],
    hours: "Tue–Sun · 11am–10pm",
    phone: "(555) 214-8890",
    address: "124 Main Street, Riverside",
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
    cta: "Book Appointment",
    services: ["Cuts & color", "Blowouts", "Manicures & facials"],
    hours: "Mon–Sat · 9am–7pm",
    phone: "(555) 903-4412",
    address: "88 Oak Avenue, Riverside",
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
    cta: "Request a Quote",
    services: ["Plumbing repairs", "Electrical work", "Kitchen & bath remodels"],
    hours: "Mon–Fri · 7am–6pm",
    phone: "(555) 672-3301",
    address: "Serving Riverside & nearby towns",
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
    cta: "Start Free Trial",
    services: ["Group classes", "Personal training", "Open gym 24/7"],
    hours: "Open 24/7 · Staffed 6am–9pm",
    phone: "(555) 480-2214",
    address: "310 Commerce Way, Riverside",
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
    cta: "Book a Checkup",
    services: ["Cleanings & exams", "Cosmetic dentistry", "Emergency care"],
    hours: "Mon–Fri · 8am–5pm",
    phone: "(555) 318-7702",
    address: "52 Harbor Plaza, Riverside",
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
    cta: "Get a Free Estimate",
    services: ["Lawn care & mowing", "Garden design", "Seasonal cleanups"],
    hours: "Mon–Sat · 7am–6pm",
    phone: "(555) 764-9908",
    address: "Serving Riverside & nearby towns",
  },
} satisfies Record<string, Demo>;

export type DemoSlug = keyof typeof demos;

export const demoSlugs = Object.keys(demos) as DemoSlug[];
