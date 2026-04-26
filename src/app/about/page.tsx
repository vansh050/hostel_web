import type { Metadata } from "next";
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-16">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-4">
          About Us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-tight">
          A second home for students and professionals in Ranchi.
        </h1>
        <p className="text-lg text-neutral-600 mt-6 max-w-2xl leading-relaxed">
          Your trusted partner for safe, comfortable, and affordable hostel
          accommodation in the heart of Ranchi.
        </p>
      </section>

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-6">
            Our story
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              {BRAND_NAME} was born out of a simple yet powerful vision — to
              provide students, working professionals, and competitive exam
              aspirants in Ranchi with a place they can truly call their second
              home.
            </p>
            <p>
              Located in the bustling Lalpur area of Ranchi, we understand the
              needs of young people who come from different cities and towns of
              Jharkhand and beyond to study, work, and build their careers. We
              know that finding a safe, clean, and affordable place to stay is
              one of the biggest challenges they face.
            </p>
            <p>
              That is why we started with one hostel and have now grown to{" "}
              <strong className="text-neutral-900 font-semibold">3 well-managed hostels</strong>{" "}
              — 2 exclusively for girls and 1 for boys. Each hostel is designed
              to provide the comfort of home with the convenience of a prime
              Lalpur location.
            </p>
            <p>
              We take pride in our home-cooked meals, 24/7 security, clean
              rooms, and a caring staff that treats every resident like family.
              Our hostels are not just a place to sleep — they are a community
              where lifelong friendships are made.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
              What we stand for
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-2xl">
              The values behind every hostel we run.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
              Our locations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Three hostels in Ranchi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostelsData.map((hostel) => (
              <Link
                key={hostel.id}
                href={`/hostel/${hostel.id}`}
                className="group block border border-neutral-200 rounded-2xl p-6 hover:border-neutral-900 transition-colors"
              >
                <span className="inline-block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
                  {hostel.type === "girls" ? "Girls" : "Boys"} Hostel
                </span>
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">
                  {hostel.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-3">
                  {hostel.landmark}, {hostel.location}
                </p>
                <p className="text-sm font-medium text-neutral-900">
                  {hostel.priceRange.replace(/Rs /g, "₹")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-950 rounded-3xl px-8 py-14 md:px-14 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Ready to find your second home?
            </h2>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
              Visit our hostels, meet our team, and experience the {BRAND_NAME}{" "}
              difference.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-neutral-900 hover:bg-neutral-100 px-6 py-3 rounded-full font-medium transition-colors mt-8"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
