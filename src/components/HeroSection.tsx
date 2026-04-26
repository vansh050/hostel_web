import Link from "next/link";
import Image from "next/image";
import { Shield, Utensils, Wifi, MapPin, Star, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-24 w-[760px] h-[760px] rounded-full bg-gradient-to-br from-rose-100 via-pink-50 to-transparent opacity-70 blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-sky-100 via-indigo-50 to-transparent opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-[540px] h-[540px] rounded-full bg-gradient-to-tl from-amber-100 via-orange-50 to-transparent opacity-60 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/80 backdrop-blur px-3.5 py-1.5 mb-7 shadow-sm">
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-amber-400 fill-amber-400"
                  />
                ))}
              </span>
              <span className="h-3 w-px bg-neutral-200" />
              <span className="text-xs font-medium text-neutral-700">
                Trusted by students & families in Ranchi
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-neutral-900 leading-[0.98]">
              Your home,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 italic font-medium text-rose-700">
                  away from home.
                </span>
                <span className="absolute left-0 bottom-1.5 h-3 w-full bg-rose-100 -z-0" />
              </span>
            </h1>

            <p className="mt-7 text-lg text-neutral-600 max-w-xl leading-relaxed">
              Three trusted hostels in Lalpur, Ranchi for students and working
              professionals. Home-cooked meals, 24/7 security, and everything
              you need to feel at home.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#hostels"
                className="group inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                Browse Hostels
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-neutral-300 hover:border-neutral-900 text-neutral-900 px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { icon: Shield, label: "24/7 Security" },
                { icon: Utensils, label: "Home-Cooked" },
                { icon: Wifi, label: "Free Wi-Fi" },
                { icon: MapPin, label: "Lalpur, Ranchi" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon
                    className="w-4 h-4 text-neutral-400"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image composition */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 shadow-2xl shadow-neutral-900/15">
                {/* TODO: swap this with a photo of your building exterior or a hero-quality room shot */}
                <Image
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85"
                  alt="Comfortable room at Lalpur Hostels, Ranchi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Soft overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent" />
              </div>

              {/* Accent image (overlapping, bottom-left) */}
              <div className="hidden md:block absolute -bottom-10 -left-10 w-[42%] aspect-square rounded-2xl overflow-hidden border-[6px] border-white shadow-xl">
                {/* TODO: swap this with a photo of your common area, terrace, or another room */}
                <Image
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=85"
                  alt="Shared space at Lalpur Hostels"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>

              {/* Rating pill — top right */}
              <div className="absolute top-6 -right-4 md:-right-6 bg-white rounded-2xl pl-3 pr-4 py-2.5 shadow-xl border border-neutral-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 leading-none">
                    4.9 / 5
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Resident rating
                  </p>
                </div>
              </div>

              {/* Price card — bottom right, overlapping */}
              <div className="absolute -bottom-8 right-0 md:right-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100 w-[220px]">
                <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-semibold mb-1">
                  Starting from
                </p>
                <p className="text-[2rem] font-bold text-neutral-900 leading-none">
                  ₹7,000
                  <span className="text-sm font-normal text-neutral-400 ml-0.5">
                    /mo
                  </span>
                </p>
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Includes meals, Wi-Fi, electricity & housekeeping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
