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

  const features = [
    {
      icon: Rocket,
      title: "Fast Delivery",
      description:
        "Get your website online in just 48 hours. No waiting weeks or months for your digital presence.",
      color: "blue",
    },
    {
      icon: Gift,
      title: "Free Basic Option",
      description:
        "Get a professional basic website completely free. No hidden costs, no catches - perfect for getting started online.",
      color: "green",
    },
    {
      icon: Palette,
      title: "Custom Design",
      description:
        "Every website is uniquely tailored to your business needs and brand identity. No cookie-cutter templates.",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description:
        "Fully optimized for all devices. Your website will look perfect on phones, tablets, and desktops.",
      color: "orange",
    },
  ];

  const services = [
    {
      name: "Basic Website",
      price: "FREE",
      priceValue: "0.00",
      description: "Perfect for small businesses and personal websites",
      features: [
        "Up to 5 pages",
        "Mobile responsive design",
        "Contact form",
      ],
      popular: false,
      isFree: true,
    },
    {
      name: "Business Website",
      price: "$399",
      priceValue: "399.00",
      description: "Ideal for growing businesses that need more features",
      features: [
        "Up to 10 pages",
        "Advanced SEO optimization",
        "Content management system",
        "Analytics integration",
        "Social media integration",
        "Hosting Fee Extra*"
      ],
      popular: true,
      isFree: false,
    },
    {
      name: "Custom Web App",
      price: "$799",
      priceValue: "799.00",
      description: "Complete solution for established businesses",
      features: [
        "Unlimited pages",
        "Custom web application",
        "Advanced e-commerce",
        "Database integration",
        "Custom features",
        "Hosting Fee Extra*"
      ],
      popular: false,
      isFree: false,
    },
  ];

  const testimonials = [
    {
      text: "InstantSiteBuilders delivered exactly what they promised. Our new website looks amazing and we were online in just 2 days. The whole process was smooth and professional - and the basic option was completely free!",
      author: "Sarah Johnson",
      role: "Owner, Local Bakery",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      text: "Outstanding service! They understood our vision perfectly and created a website that truly represents our brand. The mobile optimization is flawless, and the pricing was very reasonable.",
      author: "Mike Chen",
      role: "CEO, Tech Startup",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      text: "Great value! Other agencies quoted thousands for basic work, but InstantSiteBuilders offered a free basic option and reasonable pricing for premium features. Highly recommend!",
      author: "Emily Rodriguez",
      role: "Founder, Fashion Boutique",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Instant Website Builder | Free & Fast Website Builder for Small Business</title>
        <meta
          name="description"
          content="Build your website online free with our instant website builder. Fast, SEO-friendly, and perfect for small businesses. No-code website builder with professional results in 48 hours."
        />
        <meta
          name="keywords"
          content="instant website builder, free website builder, website builder for small business, SEO-friendly website builder, build website online free, website builder with SEO tools, no-code website builder, fast website builder"
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
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
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
                Features
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="mx-3 mt-2 w-auto bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Launch Your Website{" "}
                <span className="text-green-400">Instantly</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Fast and professionally built websites & apps for
                individuals and small businesses - starting free!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Get Started Today
                </Button>
                <Button
                  onClick={() => scrollToSection("features")}
                  variant="outline"
                  className="border-2 border-white text-blue-600 hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all hover:scale-105 duration-200"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional web development team working on computers"
                className="rounded-2xl shadow-2xl w-full h-auto transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose InstantSiteBuilders?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver professional websites that help your business grow,
              with unmatched speed and a free basic option to get you started.
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Website Design Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the service that fits your needs. Basic websites are completely free,
              with premium options available for advanced features.
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
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
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
                        Get Started Free
                      </Button>
                    ) : (
                      <Button
                        onClick={() => scrollToSection("contact")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Get Started
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real clients say
              about working with us.
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your project and we'll get back to you within 24
              hours with a custom proposal for your needs.
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
                            placeholder="Tell us about your business, timeline, and any specific requirements..."
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
                        : "Send Message"}
                    </Button>
                    <p className="text-gray-600 text-sm mt-4">
                      We'll respond within 24 hours with a custom proposal for your
                      project.
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
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <img
                  src={logoPath}
                  alt="InstantSiteBuilders Logo"
                  className="h-16 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Fast and professionally built websites & apps for
                individuals and small businesses. Get online in 48 hours with
                our expert team - starting free!
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
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Reviews
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
