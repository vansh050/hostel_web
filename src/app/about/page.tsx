import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Heart, Users, Sparkles, MapPin, Clock } from "lucide-react";
import { BRAND_NAME, hostelsData } from "@/data/hostels";
import Link from "next/link";

export const metadata: Metadata = {
  title: `About Us - ${BRAND_NAME} | Trusted Hostels in Ranchi`,
  description: `Learn about ${BRAND_NAME} - the most trusted hostel provider in Lalpur, Ranchi. We run 3 hostels (2 girls, 1 boys) providing safe, affordable accommodation with home-cooked meals and modern facilities.`,
  alternates: {
    canonical: "https://lalpurhostels.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Editorial hero */}
      <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-6">
            — About {BRAND_NAME}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.96] tracking-tight font-medium max-w-5xl">
            A second home for{" "}
            <span
              className="font-display-italic"
              style={{ color: "var(--color-saffron)" }}
            >
              students & professionals
            </span>{" "}
            in Ranchi.
          </h1>
        </div>
      </section>

      {/* Cover image — wide editorial */}
      <section className="px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/8] overflow-hidden rounded-sm bg-stone-100">
            <Image
              src="/images/sankalp-boys-hostel/photo-03.jpeg"
              alt={`${BRAND_NAME} — hostels in Lalpur, Ranchi`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Story — magazine layout */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Our story
              </p>
              <p
                className="text-sm uppercase tracking-[0.18em] font-medium"
                style={{ color: "var(--color-saffron)" }}
              >
                Est. in Lalpur, Ranchi
              </p>
            </div>
            <div className="lg:col-span-8 max-w-3xl">
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                We started with one hostel, and a simple idea — that a place to
                stay can also feel like home.
              </h2>
              <div className="space-y-5 text-stone-700 leading-relaxed text-[1.0625rem]">
                <p
                  className="[&::first-letter]:font-display [&::first-letter]:text-6xl [&::first-letter]:float-left [&::first-letter]:leading-[0.85] [&::first-letter]:mr-3 [&::first-letter]:mt-1 [&::first-letter]:font-medium"
                >
                  {BRAND_NAME} was born out of a simple yet powerful vision —
                  to provide students, working professionals, and competitive
                  exam aspirants in Ranchi with a place they can truly call
                  their second home.
                </p>
                <p>
                  Located in the bustling Lalpur area of Ranchi, we understand
                  the needs of young people who come from different cities and
                  towns of Jharkhand and beyond to study, work, and build their
                  careers. We know that finding a safe, clean, and affordable
                  place to stay is one of the biggest challenges they face.
                </p>
                <p>
                  That is why we started with one hostel and have now grown to
                  three well-managed hostels — two exclusively for girls and
                  one for boys. Each is designed to provide the comfort of home
                  with the convenience of a prime Lalpur location.
                </p>
                <p>
                  We take pride in our home-cooked meals, 24/7 security, clean
                  rooms, and a caring staff that treats every resident like
                  family. Our hostels are not just a place to sleep — they are
                  a community where lifelong friendships are made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 md:py-36 px-6 md:px-10 lg:px-14 border-y"
        style={{
          backgroundColor: "var(--color-cream-deep)",
          borderColor: "var(--color-line)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20">
            <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
              — What we stand for
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.06] tracking-tight font-medium max-w-3xl">
              The values behind every hostel{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--color-saffron)" }}
              >
                we run.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Safety first",
                description:
                  "24/7 CCTV surveillance, security guards, strict visitor policy, and well-lit premises.",
              },
              {
                icon: Heart,
                title: "Homely environment",
                description:
                  "A warm, family-like atmosphere where every resident feels at home.",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "A supportive community of students and professionals who grow together.",
              },
              {
                icon: Sparkles,
                title: "Quality & hygiene",
                description:
                  "Clean rooms, regular housekeeping, hygienic food preparation. No compromises.",
              },
              {
                icon: MapPin,
                title: "Prime location",
                description:
                  "All hostels are in Lalpur — close to markets, coaching centers, and transport.",
              },
              {
                icon: Clock,
                title: "Affordable pricing",
                description:
                  "Quality accommodation without hidden charges. Transparent pricing.",
              },
            ].map((item, i) => (
              <div key={item.title} className="relative">
                <span
                  className="absolute -top-2 -left-1 font-display text-7xl text-stone-300/70 font-medium leading-none select-none pointer-events-none"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative pt-12">
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

      {/* Hostels */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
              — Our locations
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-tight font-medium">
              Three hostels.{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--color-saffron)" }}
              >
                One Lalpur.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostelsData.map((hostel) => (
              <Link
                key={hostel.id}
                href={`/hostel/${hostel.id}`}
                className="group block bg-white border border-stone-200 rounded-sm p-6 hover:border-stone-900 transition-colors"
              >
                <span
                  className={`inline-block text-[10px] uppercase tracking-[0.22em] mb-4 px-2 py-0.5 rounded-full text-white ${
                    hostel.type === "girls" ? "bg-pink-500" : "bg-blue-500"
                  }`}
                >
                  {hostel.type === "girls" ? "Girls" : "Boys"}
                </span>
                <h3 className="font-display text-xl font-medium tracking-tight mb-1 group-hover:opacity-70 transition-opacity">
                  {hostel.name}
                </h3>
                <p className="text-sm text-stone-500 mb-4">
                  {hostel.landmark}
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {hostel.priceRange}
                </p>
              </Link>
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
            <p className="relative text-[11px] uppercase tracking-[0.32em] text-amber-200/80 mb-6">
              — Ready to visit?
            </p>
            <h2 className="relative font-display text-white text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-tight font-medium max-w-3xl mx-auto">
              Find your second home.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-stone-900 px-7 py-3.5 rounded-full font-medium transition-colors mt-10"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
