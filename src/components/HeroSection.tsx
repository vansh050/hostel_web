import Link from "next/link";
import Image from "next/image";
import { MapPin, Shield, Utensils, Wifi } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[650px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1920&q=80"
        alt="Comfortable hostel room in Ranchi"
        fill
        className="object-cover"
        sizes="100vw"
        preload
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Trusted Hostels in Lalpur, Ranchi
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Best Hostels in Ranchi for{" "}
            <span className="text-amber-400">Boys & Girls</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Safe, affordable hostel & PG accommodation in the heart of Lalpur,
            Ranchi. Home-cooked meals, free Wi-Fi, 24/7 security, and a caring
            environment for students and working professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#hostels"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors text-lg shadow-lg shadow-amber-500/25"
            >
              Explore Our Hostels
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-3.5 rounded-lg font-semibold transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl">
          {[
            { icon: Shield, label: "24/7 Security", sub: "CCTV & Guards" },
            { icon: Utensils, label: "Home-Cooked Meals", sub: "Veg & Non-Veg" },
            { icon: Wifi, label: "Free Wi-Fi", sub: "High Speed" },
            { icon: MapPin, label: "Prime Location", sub: "Lalpur, Ranchi" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
