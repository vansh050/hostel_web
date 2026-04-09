import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  User,
  Check
} from "lucide-react";
import { hostelsData } from "../data/hostels";
import { ReviewCard } from "./ReviewCard";
import { SEO } from "./SEO";
import { useState } from "react";

export function HostelDetail() {
  const { id } = useParams();
  const hostel = hostelsData.find((h) => h.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hostel Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [hostel.mainImage, ...hostel.gallery];

  // Calculate average rating
  const averageRating = hostel.reviews.reduce((acc, review) => acc + review.rating, 0) / hostel.reviews.length;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": hostel.name,
    "description": hostel.description,
    "image": allImages,
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
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": hostel.reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": hostel.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.comment,
      "datePublished": review.date
    })),
    "telephone": hostel.contacts[0]?.phone,
    "email": hostel.contacts[0]?.email
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${hostel.name} - ${hostel.tagline} | Premium Hostel Accommodation`}
        description={`${hostel.description} Located at ${hostel.location}. ${hostel.priceRange}. ${hostel.amenities.slice(0, 5).join(', ')} and more.`}
        keywords={`${hostel.name}, hostel, budget accommodation, ${hostel.location}, ${hostel.amenities.join(', ')}`}
        image={hostel.mainImage}
        type="business.business"
        structuredData={structuredData}
      />

      {/* Back Button */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Breadcrumb">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Back to All Hostels
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
            {/* Main Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={allImages[selectedImage]}
                alt={`${hostel.name} - ${selectedImage === 0 ? 'Main view' : `Gallery image ${selectedImage}`}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {hostel.name}
                </h1>
                <p className="text-xl text-white/90">{hostel.tagline}</p>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4" role="tablist" aria-label="Hostel image gallery">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    role="tab"
                    aria-selected={selectedImage === index}
                    aria-label={`View image ${index + 1} of ${allImages.length}`}
                    className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-4 ring-blue-600"
                        : "ring-2 ring-gray-200 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${hostel.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
              aria-labelledby="about-heading"
            >
              <h2 id="about-heading" className="text-2xl font-bold text-gray-900 mb-4">About This Hostel</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{hostel.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
                  <span>{hostel.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" aria-hidden="true" />
                  <span>{hostel.priceRange}</span>
                </div>
              </div>
            </motion.section>

            {/* Amenities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
              aria-labelledby="amenities-heading"
            >
              <h2 id="amenities-heading" className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hostel.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
              aria-labelledby="reviews-heading"
            >
              <h2 id="reviews-heading" className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
              <div className="space-y-4">
                {hostel.reviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar - Contact Information */}
          <aside className="lg:col-span-1">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg sticky top-6"
              aria-labelledby="contact-heading"
            >
              <h2 id="contact-heading" className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              
              {hostel.contacts.map((contact, index) => (
                <div
                  key={index}
                  className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label={`Call ${contact.name} at ${contact.phone}`}
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      <span>{contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label={`Email ${contact.name} at ${contact.email}`}
                    >
                      <Mail className="w-5 h-5" aria-hidden="true" />
                      <span className="break-all">{contact.email}</span>
                    </a>
                  </div>
                </div>
              ))}

              <button 
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                aria-label={`Book now at ${hostel.name}`}
              >
                Book Now
              </button>
            </motion.section>
          </aside>
        </div>
      </main>
    </div>
  );
}