import type { Metadata } from "next";
import { Shield, Heart, Users, Award, MapPin, Clock } from "lucide-react";
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About {BRAND_NAME}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Your trusted partner for safe, comfortable, and affordable hostel
            accommodation in the heart of Ranchi.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              {BRAND_NAME} was born out of a simple yet powerful vision - to
              provide students, working professionals, and competitive exam
              aspirants in Ranchi with a place they can truly call their second
              home.
            </p>
            <p>
              Located in the bustling Lalpur area of Ranchi, we understand the
              needs of young people who come from different cities and towns of
              Jharkhand and beyond to study, work, and build their careers. We know
              that finding a safe, clean, and affordable place to stay is one of
              the biggest challenges they face.
            </p>
            <p>
              That is why we started with one hostel and have now grown to{" "}
              <strong>3 well-managed hostels</strong> - 2 exclusively for girls
              and 1 for boys. Each hostel is designed to provide the comfort of
              home with the convenience of a prime Lalpur location.
            </p>
            <p>
              We take pride in our <strong>home-cooked meals</strong>,{" "}
              <strong>24/7 security</strong>, <strong>clean rooms</strong>, and a{" "}
              <strong>caring staff</strong> that treats every resident like family.
              Our hostels are not just a place to sleep - they are a community
              where lifelong friendships are made.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "24/7 CCTV surveillance, security guards, strict visitor policy, and well-lit premises. Your safety is our top priority.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Heart,
                title: "Homely Environment",
                description:
                  "We create a warm, family-like atmosphere where every resident feels at home. Our staff cares for you like their own.",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "A supportive community of students and professionals who help each other grow, study, and succeed together.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: Award,
                title: "Quality & Hygiene",
                description:
                  "Clean rooms, regular housekeeping, hygienic food preparation, and well-maintained common areas. No compromises.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: MapPin,
                title: "Prime Location",
                description:
                  "All our hostels are in Lalpur - the heart of Ranchi. Close to markets, coaching centers, offices, and transport hubs.",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: Clock,
                title: "Affordable Pricing",
                description:
                  "Quality accommodation that does not burn a hole in your pocket. Transparent pricing with no hidden charges.",
                color: "bg-teal-50 text-teal-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Hostels Summary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our 3 Hostels in Ranchi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostelsData.map((hostel) => (
              <Link
                key={hostel.id}
                href={`/hostel/${hostel.id}`}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 ${hostel.type === "girls" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"} rounded-xl flex items-center justify-center mx-auto mb-3`}
                >
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {hostel.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {hostel.type === "girls" ? "Girls Hostel" : "Boys Hostel"} |{" "}
                  {hostel.location}
                </p>
                <p className="text-blue-600 font-semibold mt-2 text-sm">
                  {hostel.priceRange}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Second Home?
          </h2>
          <p className="text-blue-100 mb-8">
            Visit our hostels, meet our team, and experience the {BRAND_NAME}{" "}
            difference.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
