import { MessageSquare, PenTool, Rocket } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell us about your business",
    description:
      "Fill out one short form — what you do, who your customers are, and any sites you like. That's all we need to get started.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "We design & build in 48 hours",
    description:
      "Our team designs a professional, mobile-ready website around your brand — layout, copy, images, and SEO basics included.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "You go live and get found",
    description:
      "Your site launches, Google starts finding you, and customers can finally reach you online. Upgrade only if you want more.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            From “no website” to “found on Google” in three steps
          </h2>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.step}>
                <div className="glass rounded-2xl p-8 h-full hover:border-lime-400/30 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-4xl font-bold text-white/10">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
