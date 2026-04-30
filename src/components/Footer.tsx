import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  BRAND_NAME,
  BRAND_PHONE,
  BRAND_EMAIL,
  hostelsData,
} from "@/data/hostels";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-stone-300"
      style={{ backgroundColor: "var(--color-forest-deep)" }}
    >
      {/* Subtle grain texture using SVG */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10">
        {/* Big editorial mark */}
        <div className="border-b border-white/10 pb-14 mb-14">
          <p className="text-[11px] uppercase tracking-[0.32em] text-amber-200/80 mb-6">
            — A second home in Ranchi
          </p>
          <h2 className="font-display text-white text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight font-medium max-w-4xl">
            Three homes.
            <br />
            <span className="font-display-italic text-amber-200">
              One family.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <span className="font-display text-white text-2xl font-medium tracking-tight block mb-3">
              {BRAND_NAME}
            </span>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm mb-6">
              Trusted hostels in Lalpur, Ranchi for students, working women,
              and exam aspirants. Home-cooked meals. 24/7 security. A family
              that cares.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`tel:${BRAND_PHONE}`}
                className="inline-flex items-center gap-2.5 text-stone-300 hover:text-amber-200 transition-colors w-fit"
              >
                <Phone className="w-3.5 h-3.5" />
                {BRAND_PHONE}
              </a>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="inline-flex items-center gap-2.5 text-stone-300 hover:text-amber-200 transition-colors w-fit"
              >
                <Mail className="w-3.5 h-3.5" />
                {BRAND_EMAIL}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-semibold mb-5 uppercase tracking-[0.22em]">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Journal" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-400 hover:text-amber-200 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <h3 className="text-white text-xs font-semibold mb-5 uppercase tracking-[0.22em]">
              Our Hostels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {hostelsData.map((hostel) => (
                <Link
                  key={hostel.id}
                  href={`/hostel/${hostel.id}`}
                  className="group"
                >
                  <span
                    className={`inline-block text-[10px] uppercase tracking-[0.18em] mb-2 ${
                      hostel.type === "girls"
                        ? "text-pink-300"
                        : "text-blue-300"
                    }`}
                  >
                    {hostel.type === "girls" ? "Girls" : "Boys"}
                  </span>
                  <h4 className="font-display text-white text-base font-medium mb-2 group-hover:text-amber-200 transition-colors">
                    {hostel.name}
                  </h4>
                  <p className="flex items-start gap-1.5 text-xs leading-relaxed text-stone-400">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {hostel.landmark}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights
            reserved.
          </p>
          <p>Hostels & PG in Lalpur, Ranchi · Made with care</p>
        </div>
      </div>
    </footer>
  );
}
