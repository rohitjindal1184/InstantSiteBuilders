import { Link, useLocation } from "wouter";
import {
    Mail,
    Clock,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-react";
import logoPath from "@assets/logo.png";

export function Footer() {
    const [location] = useLocation();

    const handleNavigation = (sectionId: string) => {
        if (location === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80;
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth",
                });
            }
        } else {
            window.location.href = `/#${sectionId}`;
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-8">
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <img
                                src={logoPath}
                                alt="InstantSiteBuilders Logo"
                                className="h-16 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Fast and professionally built websites & apps for individuals and
                            small businesses. Get online in 48 hours with our expert team -
                            starting free!
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
                                    onClick={() => handleNavigation("features")}
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("services")}
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("testimonials")}
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Reviews
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("contact")}
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
                        <h4 className="text-lg font-semibold mb-4">AI Generators</h4>
                        <ul className="space-y-2">
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
                                    href="/email-signature-generator"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Email Signature Generator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ai-reply-generator"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    AI Reply Generator
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
                                    href="/sitemap-extractor"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Sitemap URL Extractor
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
                            onClick={() => handleNavigation("features")}
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
    );
}
