import HeroSection from "@/components/HeroSection";
import HostelCard from "@/components/HostelCard";
import ReviewCard from "@/components/ReviewCard";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import { Shield, Heart, Sparkles, Clock } from "lucide-react";

export default function HomePage() {
  const allReviews = hostelsData.flatMap((h) =>
    h.reviews.map((r) => ({ ...r, hostelName: h.name }))
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    description:
      "Trusted hostels in Lalpur, Ranchi offering safe and affordable accommodation for boys and girls with home-cooked meals, free Wi-Fi, and 24/7 security.",
    url: "https://lalpurhostels.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ranchi",
      addressRegion: "Jharkhand",
      postalCode: "834001",
      addressCountry: "IN",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hostel Rooms",
      itemListElement: hostelsData.map((hostel) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "LodgingBusiness",
          name: hostel.name,
          description: hostel.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: hostel.fullAddress,
            addressLocality: "Ranchi",
            addressRegion: "Jharkhand",
            postalCode: hostel.pincode,
            addressCountry: "IN",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* Hostels */}
      <section
        id="hostels"
        className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Soft ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/4 w-[640px] h-[640px] bg-gradient-to-br from-rose-100 via-pink-50 to-transparent opacity-70 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-1/4 w-[640px] h-[640px] bg-gradient-to-br from-indigo-100 via-sky-50 to-transparent opacity-60 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-[440px] h-[440px] bg-gradient-to-tl from-amber-100 to-transparent opacity-60 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 mb-4">
                — Our Hostels
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
                Three places to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 italic font-medium text-rose-700">
                    call home
                  </span>
                  <span className="absolute left-0 bottom-1 h-2.5 w-full bg-rose-100 -z-0" />
                </span>
                .
              </h2>
            </div>
            <p className="text-neutral-600 max-w-md md:text-right leading-relaxed">
              Three hostels and PGs in Lalpur designed for students, working
              professionals, and exam aspirants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {hostelsData.map((hostel, index) => (
              <HostelCard key={hostel.id} hostel={hostel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
              Why residents choose us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Built around safety, food, and care
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: Shield,
                title: "Always secure",
                description: "24/7 CCTV, guards at the door, strict visitor policy.",
              },
              {
                icon: Heart,
                title: "Home-cooked food",
                description: "Three meals a day. Veg & non-veg. Best food quality in Ranchi.",
              },
              {
                icon: Sparkles,
                title: "Clean & maintained",
                description: "Daily housekeeping. Hot water, RO drinking water, power backup.",
              },
              {
                icon: Clock,
                title: "Years of trust",
                description: "Serving students and professionals across Ranchi for years.",
              },
            ].map((item) => (
              <div key={item.title}>
                <item.icon className="w-6 h-6 text-neutral-900 mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-2xl">
              What our residents say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.slice(0, 6).map((review) => (
              <ReviewCard
                key={`${review.hostelName}-${review.id}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-950 rounded-3xl px-8 py-14 md:px-14 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Looking for a hostel in Ranchi?
            </h2>
            <p className="text-neutral-400 text-lg mt-5 max-w-xl mx-auto">
              Book a room or schedule a visit. We&apos;ll show you around and
              answer every question.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#hostels"
                className="inline-flex items-center justify-center bg-white hover:bg-neutral-100 text-neutral-900 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Browse Hostels
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border border-neutral-700 hover:border-neutral-500 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
