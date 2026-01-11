import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/logo.png";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [location] = useLocation();

    const handleNavigation = (sectionId: string) => {
        setMobileMenuOpen(false);
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
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <img
                                src={logoPath}
                                alt="InstantSiteBuilders Logo"
                                className="h-20 w-auto cursor-pointer"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <button
                                onClick={() => handleNavigation("features")}
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => handleNavigation("services")}
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => handleNavigation("testimonials")}
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                Reviews
                            </button>
                            <button
                                onClick={() => handleNavigation("contact")}
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                Contact
                            </button>
                            <Button
                                onClick={() => handleNavigation("contact")}
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
                            onClick={() => handleNavigation("features")}
                            className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => handleNavigation("services")}
                            className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => handleNavigation("testimonials")}
                            className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => handleNavigation("contact")}
                            className="block px-3 py-2 text-gray-600 hover:text-blue-600 w-full text-left"
                        >
                            Contact
                        </button>
                        <div className="px-3 py-2">
                            <Button
                                onClick={() => handleNavigation("contact")}
                                className="bg-blue-600 hover:bg-blue-700 w-full"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
