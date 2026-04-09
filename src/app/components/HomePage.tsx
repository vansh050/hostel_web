import { motion } from "motion/react";
import { HostelCard } from "./HostelCard";
import { hostelsData } from "../data/hostels";
import { Building2 } from "lucide-react";
import { SEO } from "./SEO";

export function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Our Hostels Collection",
    "description": "Premium budget hostels offering exceptional service and unique experiences",
    "itemListElement": hostelsData.map((hostel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LodgingBusiness",
        "name": hostel.name,
        "description": hostel.description,
        "image": hostel.mainImage,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": hostel.location
        },
        "priceRange": hostel.priceRange,
        "amenityFeature": hostel.amenities.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity
        })),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": hostel.reviews.length
        }
      }
    }))
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Premium Hostels - Budget Accommodation with Exceptional Service"
        description="Discover our collection of 3 unique hostels offering comfortable budget accommodation, modern amenities, and unforgettable experiences. Book your perfect stay today!"
        keywords="hostels, budget accommodation, backpacker hostels, cheap lodging, travel accommodation, hostel booking, budget travel, youth hostel"
        structuredData={structuredData}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-16 h-16 text-blue-600" aria-hidden="true" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Our Hostels
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect stay from our collection of unique hostels. 
            Each one offers a distinct experience with exceptional service.
          </p>
        </motion.header>

        {/* Hostel Cards Grid */}
        <section aria-label="Our hostels">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostelsData.map((hostel, index) => (
              <HostelCard key={hostel.id} hostel={hostel} index={index} />
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
          aria-label="Why choose our hostels"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Hostels?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <div className="text-3xl mb-2" role="img" aria-label="Trophy">🏆</div>
                <h3 className="font-semibold text-gray-900 mb-1">Top Rated</h3>
                <p className="text-sm text-gray-600">5-star reviews from travelers worldwide</p>
              </div>
              <div>
                <div className="text-3xl mb-2" role="img" aria-label="Globe">🌍</div>
                <h3 className="font-semibold text-gray-900 mb-1">Prime Locations</h3>
                <p className="text-sm text-gray-600">Easy access to major attractions</p>
              </div>
              <div>
                <div className="text-3xl mb-2" role="img" aria-label="Hundred points">💯</div>
                <h3 className="font-semibold text-gray-900 mb-1">Best Value</h3>
                <p className="text-sm text-gray-600">Quality accommodation at great prices</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}