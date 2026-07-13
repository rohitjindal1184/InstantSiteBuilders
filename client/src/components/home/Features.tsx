import { Search, Gift, Rocket, Smartphone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const features = [
  {
    icon: Search,
    title: "Get Found on Google",
    description:
      "When customers search for your services nearby, your business shows up. No more losing leads to competitors who already have a website.",
  },
  {
    icon: Gift,
    title: "Start Free, Grow Later",
    description:
      "Launch with a professional website at zero cost. Upgrade only when your business is ready — no contracts, no surprises.",
  },
  {
    icon: Rocket,
    title: "Live in 48 Hours",
    description:
      "You run a business, not a web project. We handle the build so you can focus on customers while your site goes live this week.",
  },
  {
    icon: Smartphone,
    title: "Works on Every Phone",
    description:
      "Most of your customers browse on mobile. Your site looks sharp on every screen — so the first impression always feels professional.",
  },
] as const;

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            Why us
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Why small business owners choose us
          </h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            You didn't start your business to become a web designer. We handle
            the website so you can handle what you do best — serving customers
            and growing your business.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <div className="glass rounded-2xl p-8 h-full group hover:border-lime-400/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:text-zinc-950 transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
