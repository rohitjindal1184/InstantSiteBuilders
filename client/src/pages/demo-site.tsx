import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link, useRoute } from "wouter";
import { Phone, MapPin, Clock, Star, Quote, ArrowRight } from "lucide-react";
import { demos, type DemoSlug } from "@/data/demos";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import SalonDemo from "@/pages/demos/salon";

export default function DemoSite() {
  const [, params] = useRoute("/demos/:industry");
  const slug = params?.industry as DemoSlug | undefined;
  const demo = slug ? demos[slug] : undefined;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!demo) return;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [demo]);

  // The salon demo has its own fully bespoke page.
  if (slug === "salon") {
    return <SalonDemo />;
  }

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Helmet>
          <title>Demo Not Found | InstantSiteBuilders</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Demo not found</h1>
          <Link href="/">
            <Button>Back to InstantSiteBuilders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const accentSolid = demo.accent.split(" ")[0];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{demo.name} — Sample Website Demo</title>
        <meta
          name="description"
          content={`See what a professionally designed ${demo.label.toLowerCase()} website looks like. ${demo.tagline}`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Announcement bar */}
      <div className="bg-zinc-950 text-white text-center text-xs sm:text-sm py-2 px-4">
        Sample demo site by{" "}
        <Link href="/" className="underline font-medium underline-offset-2">
          InstantSiteBuilders
        </Link>
        . Want one for your business?{" "}
        <Link href="/#contact" className="underline font-medium underline-offset-2">
          Get started free
        </Link>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-sm border-b border-gray-100" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <span className={`font-display text-xl sm:text-2xl font-bold ${demo.accentText}`}>
            {demo.name}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${demo.phone.replace(/[^\d+]/g, "")}`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Phone className="w-4 h-4" />
              {demo.phone}
            </a>
            <Button className={`${demo.accent} text-white rounded-full font-semibold`}>
              {demo.cta}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <img
          src={demo.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${demo.heroBg}`} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <Reveal className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-white/80 mb-4 font-medium">
              Welcome to
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              {demo.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
              {demo.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`${demo.accent} text-white rounded-full px-8 py-6 text-base font-semibold group`}
              >
                {demo.cta}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <a href={`tel:${demo.phone.replace(/[^\d+]/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-sm"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call {demo.phone}
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-xl mt-16 pt-10 border-t border-white/15">
              {demo.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About + visit info */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-12 items-start">
          <Reveal className="md:col-span-3">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${demo.accentText}`}>
              About us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              A local business, done right
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{demo.about}</p>
            <div className="flex flex-wrap gap-2">
              {demo.services.map((service) => (
                <span
                  key={service}
                  className={`text-sm font-medium ${demo.accentText} ${demo.soft} rounded-full px-4 py-2`}
                >
                  {service}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 sm:p-8 space-y-5">
              <h3 className="font-display text-lg font-bold text-gray-900">Visit us</h3>
              <p className="flex items-start gap-3 text-gray-600">
                <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${demo.accentText}`} />
                {demo.address}
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <Clock className={`w-5 h-5 shrink-0 ${demo.accentText}`} />
                {demo.hours}
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <Phone className={`w-5 h-5 shrink-0 ${demo.accentText}`} />
                {demo.phone}
              </p>
              <Button className={`w-full ${demo.accent} text-white rounded-full font-semibold`}>
                {demo.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${demo.accentText}`}>
              Why choose us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              What sets {demo.name} apart
            </h2>
          </Reveal>

          <Stagger className="grid sm:grid-cols-3 gap-6">
            {demo.whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 h-full">
                    <div
                      className={`w-12 h-12 rounded-xl ${demo.soft} flex items-center justify-center mb-5`}
                    >
                      <Icon className={`w-6 h-6 ${demo.accentText}`} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${demo.accentText}`}>
              Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              What our customers say
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {demo.testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full flex flex-col">
                  <Quote className={`w-8 h-8 mb-4 ${demo.accentText} opacity-40`} />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${accentSolid} text-white flex items-center justify-center text-sm font-semibold shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{testimonial.name}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA band */}
      <section className={`${accentSolid} py-16 md:py-20`}>
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Reach out today — we'd love to help.
          </p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold"
          >
            {demo.cta}
          </Button>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-14 px-4">
        <div className="max-w-6xl mx-auto sm:px-6 text-center">
          <p className={`font-display text-xl font-bold mb-6 ${demo.accentText}`}>{demo.name}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm mb-10">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {demo.address}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {demo.hours}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {demo.phone}
            </span>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-zinc-500 mb-4">
              This is a sample website demo — not a real business.
            </p>
            <Link href="/">
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                Back to InstantSiteBuilders
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
