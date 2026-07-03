import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";
import {
  insertContactSubmissionSchema,
  type InsertContactSubmission,
} from "@shared/schema";
import logoPath from "@assets/logo.png";

import {
  Rocket,
  Gift,
  Palette,
  Smartphone,
  Check,
  Star,
  Menu,
  X,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Search,
  Phone,
  Store,
  Scissors,
  Wrench,
  UtensilsCrossed,
} from "lucide-react";

import { Helmet } from "react-helmet-async";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactSubmission) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      trackEvent("contact_form_submit", "engagement", "contact_form");
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("nav");
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add("shadow-md", "bg-white/95");
        } else {
          header.classList.remove("shadow-md", "bg-white/95");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessTypes = [
    { icon: UtensilsCrossed, label: "Restaurants & Cafés" },
    { icon: Scissors, label: "Salons & Spas" },
    { icon: Wrench, label: "Contractors & Trades" },
    { icon: Store, label: "Retail & Boutiques" },
  ];

  const features = [
    {
      icon: Search,
      title: "Get Found on Google",
      description:
        "When customers search for your services nearby, your business shows up. No more losing leads to competitors who already have a website.",
      color: "blue",
    },
    {
      icon: Gift,
      title: "Start Free, Grow Later",
      description:
        "Launch with a professional website at zero cost. Upgrade only when your business is ready — no contracts, no surprises.",
      color: "green",
    },
    {
      icon: Rocket,
      title: "Live in 48 Hours",
      description:
        "You run a business, not a web project. We handle the build so you can focus on customers while your site goes live this week.",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: "Works on Every Phone",
      description:
        "Most of your customers browse on mobile. Your site looks sharp on every screen — so the first impression always feels professional.",
      color: "orange",
    },
  ];

  const services = [
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
  ];

  const websiteExamples = [
    {
      industry: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Sample restaurant website design with menu and booking layout",
      mirror: "Turn menu visitors into table bookings",
      result: "Built for mobile-first local discovery",
    },
    {
      industry: "Salon",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Sample salon website design with services and appointment booking",
      mirror: "Make it easy to book from Instagram traffic",
      result: "Designed to turn visits into appointments",
    },
    {
      industry: "Contractor",
      image:
        "https://images.unsplash.com/photo-1504307653784-414bc1655797?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      imageAlt: "Sample contractor website design with quote request and trust signals",
      mirror: "Help homeowners request a quote in minutes",
      result: "Built for trust, speed, and phone leads",
    },
  ];

  const handleExampleClick = (industry: string) => {
    trackEvent("example_card_cta_click", "engagement", industry);
    scrollToSection("contact");
  };

  const testimonials = [
    {
      text: "I kept putting off a website because I thought it would cost thousands. They built our bakery site for free and we were taking online orders within two days. Our walk-in traffic went up because people finally found us on Google.",
      author: "Sarah Johnson",
      role: "Owner, Sweet Rise Bakery",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      text: "As a one-person plumbing business, I didn't have time to figure out websites. They asked the right questions, built exactly what I needed, and now I get 3–4 new job calls a week from the site alone.",
      author: "Mike Chen",
      role: "Owner, Chen Plumbing Co.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      text: "Other agencies wanted $5,000 just for a basic site. Here I got a beautiful boutique website that matches my brand, works perfectly on phones, and didn't break my startup budget.",
      author: "Emily Rodriguez",
      role: "Owner, Luna Lane Boutique",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Small Business Websites — Free to Start, Live in 48 Hours | InstantSiteBuilders</title>
        <meta
          name="description"
          content="Professional websites built for small businesses. Start free, go live in 48 hours, no coding required. Get found on Google and turn visitors into customers."
        />
        <meta
          name="keywords"
          content="small business website, free website for small business, local business website, affordable web design, website in 48 hours, small business web design, get business online"
        />
      </Helmet>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={logoPath}
                alt="InstantSiteBuilders Logo"
                className="h-20 w-auto"
              />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Why Us
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Success Stories
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Get My Free Website
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Success Stories
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="mx-3 mt-2 w-auto bg-green-600 hover:bg-green-700"
              >
                Get My Free Website
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm font-medium text-blue-100">
                <Store className="w-4 h-4" />
                Built for local & small businesses
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Customers Are Searching.{" "}
                <span className="text-green-400">Are They Finding You?</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-100 leading-relaxed">
                We build professional websites for small businesses — free to
                start, live in 48 hours, and zero tech skills required on your
                end.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start text-sm text-blue-200">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" /> Free starter site
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" /> Live in 48 hours
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" /> No coding needed
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Get My Free Website
                </Button>
                <Button
                  onClick={() => scrollToSection("services")}
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold transition-all hover:scale-105 duration-200"
                  size="lg"
                >
                  See Pricing
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Small business owner reviewing their new professional website"
                className="rounded-2xl shadow-2xl w-full h-auto transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wide mb-8">
            Trusted by owners across every industry
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {businessTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="bg-blue-100 text-blue-700 rounded-full w-14 h-14 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-gray-700 font-medium text-center text-sm">
                    {type.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Small Business Owners Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You didn't start your business to become a web designer. We handle
              the website so you can handle what you do best — serving customers
              and growing your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
                green: "bg-green-50 text-green-600 group-hover:bg-green-600",
                purple:
                  "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
                orange:
                  "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
              };

              return (
                <div key={index} className="text-center group">
                  <div
                    className={`${colorClasses[feature.color as keyof typeof colorClasses]} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:text-white transition-colors duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Website Examples */}
      <section id="examples" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See What Your Business Could Look Like Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three sample website directions to help you picture what your
              business could look like online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {websiteExamples.map((example) => (
              <Card
                key={example.industry}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="px-4 pt-4 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                    {example.industry}
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Sample
                  </span>
                </div>
                <div className="aspect-[16/10] mx-4 mt-3 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={example.image}
                    alt={example.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col flex-1 p-6 pt-4">
                  <p className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {example.mirror}
                  </p>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-1">
                    {example.result}
                  </p>
                  <Button
                    onClick={() => handleExampleClick(example.industry)}
                    className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    See This Site
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing. No Surprises.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with a free website today. Upgrade when your business grows —
              you only pay for what you actually need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-shadow duration-300 ${service.popular ? "border-2 border-blue-600 shadow-xl" : ""}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-block whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                      Best for Growing Businesses
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </CardTitle>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${service.isFree ? "text-green-600" : "text-blue-600"}`}>
                      {service.price}
                    </span>
                    <span className="text-gray-600 ml-2">{service.isFree ? "always" : "one-time"}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    {service.isFree ? (
                      <Button
                        onClick={() => scrollToSection("contact")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Claim My Free Site
                      </Button>
                    ) : (
                      <Button
                        onClick={() => scrollToSection("contact")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Get a Quote
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real Business Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These aren't tech companies — they're local shops, trades, and
              service businesses just like yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-50 hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.author}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's Get Your Business Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your business and we'll send you a free proposal within
              24 hours. No pressure, no jargon — just a clear plan and honest pricing.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8 md:p-12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Business Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your business name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Business Details *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="What type of business do you run? What services do you offer? Any examples of sites you like?"
                            className="resize-vertical"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                      size="lg"
                    >
                      {contactMutation.isPending
                        ? "Sending..."
                        : "Send My Free Proposal Request"}
                    </Button>
                    <p className="text-gray-600 text-sm mt-4">
                      <Phone className="w-4 h-4 inline mr-1" />
                      We'll reply within 24 hours with next steps — usually sooner.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-6 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <img
                  src={logoPath}
                  alt="InstantSiteBuilders Logo"
                  className="h-16 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Professional websites for small businesses — built for you, live
                in 48 hours, and free to get started. Stop losing customers to
                competitors who already show up online.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Why Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Success Stories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Convert to Markdown</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/convert-pdf-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    PDF to Markdown
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convert-html-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    HTML to Markdown
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convert-xml-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    XML to Markdown
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convert-json-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    JSON to Markdown
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convert-rtf-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    RTF to Markdown
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convert-webpage-to-markdown"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Webpage to Markdown
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Other Tools</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/sitemap-validator"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Sitemap Validator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap-generator"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    XML Sitemap Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap-extractor"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Sitemap URL Extractor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/email-signature-generator"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Email Signature Generator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a
                    href="mailto:hello@instantsitebuilders.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    hello@instantsitebuilders.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Response time: 24 hours
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 InstantSiteBuilders. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                About
              </button>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
