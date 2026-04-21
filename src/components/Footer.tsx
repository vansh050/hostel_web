import Link from "next/link";
import { Building2, Phone, Mail, MapPin } from "lucide-react";
import {
  BRAND_NAME,
  BRAND_PHONE,
  BRAND_EMAIL,
  hostelsData,
} from "@/data/hostels";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-7 h-7 text-blue-400" />
              <span className="text-xl font-bold text-white">{BRAND_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Trusted hostels in Lalpur, Ranchi providing safe, clean, and
              affordable accommodation for boys and girls since years.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${BRAND_PHONE}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {BRAND_PHONE}
              </a>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {BRAND_EMAIL}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              {hostelsData.map((hostel) => (
                <li key={hostel.id}>
                  <Link
                    href={`/hostel/${hostel.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {hostel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Hostels */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Our Hostel Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hostelsData.map((hostel) => (
                <div key={hostel.id} className="text-sm">
                  <h4 className="text-white font-medium mb-1">{hostel.name}</h4>
                  <p className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {hostel.fullAddress} - {hostel.pincode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>
            Best Hostels in Lalpur, Ranchi | Girls Hostel & Boys Hostel in Ranchi
          </p>
        </div>
      </div>
    </footer>
  );
}
