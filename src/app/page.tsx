import HeroSection from "@/components/HeroSection";
import HostelCard from "@/components/HostelCard";
import ReviewCard from "@/components/ReviewCard";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import { Star, Award, Clock, Heart } from "lucide-react";

export default function HomePage() {
  // Collect all reviews for the testimonials section
  const allReviews = hostelsData.flatMap((h) =>
    h.reviews.map((r) => ({ ...r, hostelName: h.name }))
  );

  // Structured Data for homepage
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
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* Hostels Section */}
      <section id="hostels" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Hostels & PG in Ranchi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our 3 well-managed hostels and PG accommodations in
              Lalpur, Ranchi. Whether you are a student, working professional, or
              competitive exam aspirant - we have the perfect budget accommodation
              for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostelsData.map((hostel, index) => (
              <HostelCard key={hostel.id} hostel={hostel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Why Choose {BRAND_NAME}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              {[
                {
                  icon: Star,
                  title: "Top Rated",
                  description:
                    "5-star reviews from residents across Ranchi.",
                  color: "text-yellow-500",
                },
                {
                  icon: Award,
                  title: "Trusted & Safe",
                  description:
                    "24/7 CCTV, security guards, strict visitor policy.",
                  color: "text-blue-500",
                },
                {
                  icon: Heart,
                  title: "Homely Food",
                  description:
                    "Home-cooked meals 3 times a day. Veg & non-veg.",
                  color: "text-red-500",
                },
                {
                  icon: Clock,
                  title: "Years of Trust",
                  description:
                    "Serving students and professionals in Ranchi.",
                  color: "text-green-500",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <item.icon
                    className={`w-8 h-8 ${item.color} mx-auto mb-2`}
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Residents Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from real residents of our hostels in Ranchi.
            </p>
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900/85 backdrop-blur-sm rounded-2xl p-10 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking for a Hostel or PG in Ranchi?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book your room today at the most trusted hostel & PG in Lalpur,
              Ranchi. Affordable budget accommodation for students, working
              professionals, and exam aspirants. Call us or visit for a free tour
              of our facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#hostels"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-amber-500/25"
              >
                View All Hostels
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-gray-400 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
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
