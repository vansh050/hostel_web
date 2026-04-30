"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BRAND_NAME, BRAND_WHATSAPP } from "@/data/hostels";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#hostels", label: "Hostels" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line)]"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(251,248,243,0.95)" }
          : undefined
      }
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[72px] md:h-[84px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            {/* Mark */}
            <span className="relative w-9 h-9 flex items-center justify-center">
              <span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "var(--color-saffron)" }}
              />
              <span className="relative font-display text-cream text-lg font-medium leading-none">
                L
              </span>
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className="font-display text-[1.15rem] font-medium tracking-tight"
                style={{ color: "var(--color-ink)" }}
              >
                {BRAND_NAME}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-stone-500 -mt-0.5">
                Lalpur, Ranchi
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute left-3.5 right-3.5 bottom-1 h-px bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
            <a
              href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I am interested in your hostel. Please share details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "var(--color-ink)" }}
            >
              <Phone className="w-3.5 h-3.5" />
              Enquire
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 rounded-lg text-stone-700"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 border-t border-stone-200 mt-2">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-stone-700 font-medium px-3 py-3 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I am interested in your hostel. Please share details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white px-4 py-3 rounded-full font-medium mt-3"
                style={{ backgroundColor: "var(--color-ink)" }}
              >
                <Phone className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
