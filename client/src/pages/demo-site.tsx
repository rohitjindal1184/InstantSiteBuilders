import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link, useRoute } from "wouter";
import { Phone, MapPin, Clock } from "lucide-react";
import { demos, type DemoSlug } from "@/data/demos";

export default function DemoSite() {
  const [, params] = useRoute("/demos/:industry");
  const slug = params?.industry as DemoSlug | undefined;
  const demo = slug ? demos[slug] : undefined;

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

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{demo.name} — Sample Website Demo</title>
        <meta name="robots" content="noindex" />
      </Helmet>

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

      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <span className={`text-xl font-bold ${demo.accentText}`}>{demo.name}</span>
          <Button className={`${demo.accent} text-white`}>{demo.cta}</Button>
        </div>
      </header>

      <section className="relative text-white">
        <img
          src={demo.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${demo.heroBg}`} />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest text-white/80 mb-3">
            Welcome
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
            {demo.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
            {demo.tagline}
          </p>
          <Button size="lg" className={`${demo.accent} text-white`}>
            {demo.cta}
          </Button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What we offer</h2>
            <ul className="space-y-3">
              {demo.services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-gray-700">
                  <span className={`w-2 h-2 rounded-full ${demo.accent}`} />
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Visit us</h3>
            <p className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              {demo.address}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 shrink-0" />
              {demo.hours}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 shrink-0" />
              {demo.phone}
            </p>
            <Button className={`w-full ${demo.accent} text-white`}>{demo.cta}</Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 px-4">
        <p className="mb-3">This is a sample website demo — not a real business.</p>
        <Link href="/">
          <Button variant="outline">Back to InstantSiteBuilders</Button>
        </Link>
      </footer>
    </div>
  );
}
