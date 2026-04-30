import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import HostelCard from "@/components/HostelCard";
import QuoteCarousel from "@/components/QuoteCarousel";
import AnimatedCounter from "@/components/AnimatedCounter";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import { Shield, Utensils, Sparkles, Heart, ArrowRight } from "lucide-react";

export default function HomePage() {
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

  const totalReviews = hostelsData.reduce(
    (acc, h) => acc + h.reviews.length,
    0
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSlider />

      {/* Story / Intro */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-6">
                — Our story
              </p>
              <p
                className="text-sm uppercase tracking-[0.18em] font-medium"
                style={{ color: "var(--color-saffron)" }}
              >
                Est. in Lalpur, Ranchi
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.06] tracking-tight font-medium">
                We started{" "}
                <span className="font-display-italic" style={{ color: "var(--color-saffron)" }}>
                  with one hostel
                </span>{" "}
                and a simple idea — that a place to stay can also feel like
                home.
              </h2>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl text-stone-700 leading-relaxed">
                <p>
                  Today we run three hostels in Lalpur: two for girls, one for
                  boys. Hundreds of students, working professionals, and exam
                  aspirants have called them home.
                </p>
                <p>
                  Home-cooked meals. 24/7 security. Daily housekeeping. And a
                  caring staff that treats every resident like family.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide"
                style={{ color: "var(--color-saffron)" }}
              >
                Read our full story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        className="py-20 md:py-24 px-6 md:px-10 lg:px-14 border-y"
        style={{
          backgroundColor: "var(--color-cream-deep)",
          borderColor: "var(--color-line)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { value: 3, suffix: "", label: "Hostels in Lalpur" },
              {
                value: 200,
                suffix: "+",
                label: "Residents hosted",
              },
              { value: 5, suffix: ".0", label: "Average rating" },
              {
                value: 24,
                suffix: "/7",
                label: "Security & care",
              },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p
                  className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-none tracking-tight"
                  style={{ color: "var(--color-ink)" }}
                >
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostels grid */}
      <section
        id="hostels"
        className="py-24 md:py-36 px-6 md:px-10 lg:px-14"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Three places to call home
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.04] tracking-tight font-medium">
                Choose where you&apos;d like to{" "}
                <span
                  className="font-display-italic"
                  style={{ color: "var(--color-saffron)" }}
                >
                  belong.
                </span>
              </h2>
            </div>
            <p className="text-stone-600 max-w-md text-base leading-relaxed">
              Each hostel has its own personality, but they share the same
              promise — clean rooms, warm food, and a family that looks out
              for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-16">
            {hostelsData.map((hostel, index) => (
              <HostelCard key={hostel.id} hostel={hostel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What residents say — quote carousel */}
      <section
        className="py-24 md:py-36 px-6 md:px-10 lg:px-14 border-y"
        style={{
          backgroundColor: "var(--color-cream-deep)",
          borderColor: "var(--color-line)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Voices from inside
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight font-medium">
                Real residents.
                <br />
                <span
                  className="font-display-italic"
                  style={{ color: "var(--color-saffron)" }}
                >
                  Real reviews.
                </span>
              </h2>
              <p className="mt-6 text-stone-600 leading-relaxed text-sm">
                Hear from {totalReviews}+ residents who&apos;ve made our
                hostels their home in Ranchi.
              </p>
            </div>
            <div className="lg:col-span-8">
              <QuoteCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
              — Why residents stay
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-tight font-medium max-w-3xl mx-auto">
              Built around{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--color-saffron)" }}
              >
                safety, food, and care.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {[
              {
                icon: Shield,
                title: "Always secure",
                description:
                  "24/7 guard at the door, CCTV across the premises, strict visitor policy.",
              },
              {
                icon: Utensils,
                title: "Home-cooked food",
                description:
                  "Three meals a day. Veg & non-veg. Best food quality in Ranchi.",
              },
              {
                icon: Sparkles,
                title: "Clean & maintained",
                description:
                  "Daily housekeeping, hot water, RO drinking water, full power backup.",
              },
              {
                icon: Heart,
                title: "Years of trust",
                description:
                  "Serving students and professionals across Ranchi for years.",
              },
            ].map((item, i) => (
              <div key={item.title} className="relative">
                <span
                  className="absolute -top-4 -left-1 font-display text-7xl text-stone-200 font-medium leading-none select-none pointer-events-none"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative pt-10">
                  <item.icon
                    className="w-6 h-6 mb-5"
                    strokeWidth={1.5}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <h3 className="font-display text-xl font-medium tracking-tight mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-14 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-sm px-8 py-20 md:px-16 md:py-28 text-center"
            style={{ backgroundColor: "var(--color-forest-deep)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            <p className="relative text-[11px] uppercase tracking-[0.32em] text-amber-200/80 mb-6">
              — Ready to visit?
            </p>
            <h2 className="relative font-display text-white text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight font-medium max-w-4xl mx-auto">
              Come over for tea.
              <br />
              <span className="font-display-italic text-amber-200">
                See your room.
              </span>
            </h2>
            <p className="relative text-stone-300 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Visit any of our hostels in Lalpur. We&apos;ll show you around
              and answer every question.
            </p>
            <div className="relative mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#hostels"
                className="inline-flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-stone-900 px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                Browse Hostels
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
