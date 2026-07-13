import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { scrollToSection } from "./scroll";

export const services = [
  {
    name: "Starter Site",
    price: "FREE",
    priceValue: "0.00",
    description: "Everything you need to look legit online and start getting calls",
    features: [
      "Up to 5 pages (Home, About, Services, Contact & more)",
      "Mobile-friendly design",
      "Contact form so leads reach you",
    ],
    popular: false,
    isFree: true,
  },
  {
    name: "Growth Site",
    price: "$399",
    priceValue: "399.00",
    description: "For businesses ready to rank higher and bring in more customers",
    features: [
      "Up to 10 pages",
      "Local SEO setup to rank in your area",
      "Easy content updates — no developer needed",
      "Visitor analytics so you know what's working",
      "Social media links built in",
      "Hosting fee extra*",
    ],
    popular: true,
    isFree: false,
  },
  {
    name: "Custom Build",
    price: "$799",
    priceValue: "799.00",
    description: "Full custom solution for shops, booking, or online sales",
    features: [
      "Unlimited pages",
      "Online booking or e-commerce",
      "Custom features for your workflow",
      "Database & integrations",
      "Priority support",
      "Hosting fee extra*",
    ],
    popular: false,
    isFree: false,
  },
] as const;

export default function Pricing() {
  return (
    <section id="services" className="py-24 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple pricing. No surprises.
          </h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            Start with a free website today. Upgrade when your business grows —
            you only pay for what you actually need.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {services.map((service) => (
            <StaggerItem key={service.name} className="h-full">
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  service.popular
                    ? "bg-white/[0.07] border-2 border-lime-400/60 shadow-[0_0_60px_-15px] shadow-lime-400/30"
                    : "glass"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-lime-400 text-zinc-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    Best for Growing Businesses
                  </span>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {service.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`font-display text-5xl font-bold ${
                        service.isFree ? "text-lime-400" : "text-white"
                      }`}
                    >
                      {service.price}
                    </span>
                    <span className="text-zinc-500 ml-2 text-sm">
                      {service.isFree ? "always" : "one-time"}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">{service.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-lime-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full rounded-full font-semibold ${
                    service.isFree || service.popular
                      ? "bg-lime-400 text-zinc-950 hover:bg-lime-300"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {service.isFree ? "Claim My Free Site" : "Get a Quote"}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
