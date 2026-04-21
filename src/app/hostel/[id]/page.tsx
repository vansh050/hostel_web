import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Star,
  Users,
  ChevronDown,
  Navigation,
  MessageCircle,
  IndianRupee,
} from "lucide-react";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import ReviewCard from "@/components/ReviewCard";
import HostelGallery from "@/components/HostelGallery";

// Generate static paths for all hostels
export async function generateStaticParams() {
  return hostelsData.map((hostel) => ({
    id: hostel.id,
  }));
}

// Dynamic metadata for each hostel page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hostel = hostelsData.find((h) => h.id === id);

  if (!hostel) {
    return { title: "Hostel Not Found" };
  }

  return {
    title: `${hostel.name} - ${hostel.type === "girls" ? "Girls" : "Boys"} Hostel in Lalpur, Ranchi | ${BRAND_NAME}`,
    description: `${hostel.name} - ${hostel.description.slice(0, 150)}... Located at ${hostel.landmark}, Lalpur, Ranchi. ${hostel.priceRange}. ${hostel.amenities.slice(0, 5).join(", ")} and more.`,
    keywords: [
      hostel.name,
      `${hostel.type} hostel ranchi`,
      `${hostel.type} hostel lalpur`,
      "hostel in ranchi",
      `${hostel.type === "girls" ? "girls" : "boys"} PG ranchi`,
      `affordable ${hostel.type} hostel ranchi`,
      "hostel near " + hostel.landmark,
    ],
    openGraph: {
      title: `${hostel.name} - Best ${hostel.type === "girls" ? "Girls" : "Boys"} Hostel in Ranchi`,
      description: hostel.description,
      images: [hostel.mainImage],
      type: "website",
    },
    alternates: {
      canonical: `https://lalpurhostels.com/hostel/${hostel.id}`,
    },
  };
}

export default async function HostelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hostel = hostelsData.find((h) => h.id === id);

  if (!hostel) {
    notFound();
  }

  const averageRating =
    hostel.reviews.reduce((acc, r) => acc + r.rating, 0) / hostel.reviews.length;

  // Structured data for this hostel
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hostel.name,
    description: hostel.description,
    image: [hostel.mainImage, ...hostel.gallery],
    address: {
      "@type": "PostalAddress",
      streetAddress: hostel.fullAddress,
      addressLocality: "Ranchi",
      addressRegion: "Jharkhand",
      postalCode: hostel.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.3600",
      longitude: "85.3200",
    },
    telephone: hostel.contacts[0]?.phone,
    email: hostel.contacts[0]?.email,
    priceRange: hostel.priceRange,
    amenityFeature: hostel.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: hostel.reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: hostel.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
      reviewBody: r.comment,
      datePublished: r.date,
    })),
  };

  // BreadcrumbList structured data for Google
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lalpurhostels.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hostels in Ranchi",
        item: "https://lalpurhostels.com/#hostels",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hostel.name,
        item: `https://lalpurhostels.com/hostel/${hostel.id}`,
      },
    ],
  };

  // FAQPage structured data for Google
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hostel.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#hostels" className="hover:text-blue-600 transition-colors">
            Hostels
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{hostel.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Header */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${
                    hostel.type === "girls" ? "bg-pink-500" : "bg-blue-500"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  {hostel.type === "girls" ? "Girls Hostel" : "Boys Hostel"}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {averageRating.toFixed(1)} ({hostel.reviews.length} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {hostel.name}
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" />
                {hostel.landmark}, {hostel.location}, Jharkhand - {hostel.pincode}
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${hostel.whatsapp}?text=Hi, I am interested in ${hostel.name}. Please share room availability and pricing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`tel:${hostel.contacts[0]?.phone}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          {/* Gallery */}
          <HostelGallery
            images={[hostel.mainImage, ...hostel.gallery]}
            hostelName={hostel.name}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {hostel.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </section>

            {/* Room Types & Pricing */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-green-600" />
                Room Types & Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hostel.roomTypes.map((room) => (
                  <div
                    key={room.name}
                    className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {room.name}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {room.price}
                    </p>
                    <ul className="space-y-2">
                      {room.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Amenities & Facilities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hostel.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Nearby Attractions */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Nearby Landmarks & Attractions
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hostel.nearbyAttractions.map((place) => (
                  <li key={place} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{place}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Guest Reviews
              </h2>
              <div className="space-y-4">
                {hostel.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {hostel.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-gray-200 rounded-lg"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-blue-600">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Contact Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contact {hostel.name}
                </h3>
                {hostel.contacts.map((contact, i) => (
                  <div key={i} className="space-y-3 mb-4">
                    <p className="font-medium text-gray-800">{contact.name}</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                  </div>
                ))}

                <a
                  href={`https://wa.me/${hostel.whatsapp}?text=Hi, I want to book a room at ${hostel.name}. Please share availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors mb-3"
                >
                  Book via WhatsApp
                </a>
                <a
                  href={`tel:${hostel.contacts[0]?.phone}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Call to Book
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                <div className="rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={hostel.googleMapsEmbed}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${hostel.name} location on Google Maps`}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3">{hostel.fullAddress}</p>
                <a
                  href={hostel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions on Google Maps
                </a>
              </div>

              {/* Quick Info */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Info</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>Type:</strong>{" "}
                    {hostel.type === "girls" ? "Girls Only" : "Boys Only"}
                  </li>
                  <li>
                    <strong>Price Range:</strong> {hostel.priceRange}
                  </li>
                  <li>
                    <strong>Area:</strong> Lalpur, Ranchi
                  </li>
                  <li>
                    <strong>Pincode:</strong> {hostel.pincode}
                  </li>
                  <li>
                    <strong>Meals:</strong> 3 times daily included
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Hostels
          </Link>
        </div>
      </div>
    </>
  );
}
