import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/logo.png";
import { scrollToSection } from "./scroll";

const navLinks = [
  { id: "examples", label: "Examples" },
  { id: "features", label: "Why Us" },
  { id: "services", label: "Pricing" },
  { id: "faq", label: "FAQ" },
] as const;

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0A0A0B]/85 backdrop-blur-md border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={logoPath}
              alt="InstantSiteBuilders Logo"
              className="h-16 w-auto brightness-0 invert"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick("contact")}
                className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold rounded-full px-6"
              >
                Get My Free Website
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-300 hover:text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block px-3 py-2 text-zinc-400 hover:text-white w-full text-left"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick("contact")}
              className="mx-3 mt-2 w-auto bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold rounded-full"
            >
              Get My Free Website
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
