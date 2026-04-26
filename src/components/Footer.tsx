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
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="text-lg font-semibold text-white tracking-tight block mb-3">
              {BRAND_NAME}
            </span>
            <p className="text-sm leading-relaxed mb-5">
              Trusted hostels in Lalpur, Ranchi providing safe, clean, and
              affordable accommodation for students and working professionals.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${BRAND_PHONE}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {BRAND_PHONE}
              </a>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {BRAND_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Our Hostels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {hostelsData.map((hostel) => (
                <Link
                  key={hostel.id}
                  href={`/hostel/${hostel.id}`}
                  className="group"
                >
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-neutral-300 transition-colors">
                    {hostel.name}
                  </h4>
                  <p className="flex items-start gap-1.5 text-xs leading-relaxed">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {hostel.landmark}, {hostel.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>Hostels & PG in Lalpur, Ranchi</p>
        </div>
      </div>
    </footer>
  );
}
