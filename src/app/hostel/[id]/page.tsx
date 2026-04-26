import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Star,
  ChevronDown,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import ReviewCard from "@/components/ReviewCard";
import HostelGallery from "@/components/HostelGallery";
import HostelContactButtons from "@/components/HostelContactButtons";

export async function generateStaticParams() {
  return hostelsData.map((hostel) => ({
    id: hostel.id,
  }));
}

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

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href="/#hostels" className="hover:text-neutral-900 transition-colors">
            Hostels
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900">{hostel.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    hostel.type === "girls" ? "bg-pink-500" : "bg-blue-500"
                  }`}
                >
                  {hostel.type === "girls" ? "Girls Hostel" : "Boys Hostel"}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-neutral-900">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-neutral-500">
                    ({hostel.reviews.length} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                {hostel.name}
              </h1>
              <p className="text-neutral-500 mt-2 flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4" />
                {hostel.landmark}, {hostel.location}, Jharkhand - {hostel.pincode}
              </p>
            </div>
           <HostelContactButtons hostel={hostel} variant="header" />
          </div>

          <HostelGallery
            images={[hostel.mainImage, ...hostel.gallery]}
            hostelName={hostel.name}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-4">
                About {hostel.name}
              </h2>
              <p className="text-neutral-700 leading-relaxed">{hostel.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Room types & pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hostel.roomTypes.map((room) => (
                  <div
                    key={room.name}
                    className="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-900 transition-colors"
                  >
                    <h3 className="font-semibold text-neutral-900 text-lg mb-1">
                      {room.name}
                    </h3>
                    <p className="text-2xl font-bold text-neutral-900 mb-5">
                      {room.price.replace("Rs ", "₹")}
                    </p>
                    <ul className="space-y-2">
                      {room.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-neutral-600"
                        >
                          <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" strokeWidth={2.25} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Amenities & facilities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {hostel.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-neutral-900 flex-shrink-0" strokeWidth={2.25} />
                    <span className="text-neutral-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Nearby landmarks
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {hostel.nearbyAttractions.map((place) => (
                  <li key={place} className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="text-neutral-700">{place}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Guest reviews
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hostel.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="border-t border-neutral-200">
                {hostel.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border-b border-neutral-200"
                  >
                    <summary className="flex items-center justify-between py-5 cursor-pointer font-medium text-neutral-900 hover:text-neutral-600">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <p className="pb-5 text-neutral-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="border border-neutral-200 rounded-2xl p-6">
                <p className="text-sm text-neutral-500 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-neutral-900 mb-6">
                  ₹7,000
                  <span className="text-base font-normal text-neutral-500"> / month</span>
                </p>

             <HostelContactButtons hostel={hostel} variant="sidebar" />

                <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                  {hostel.contacts.map((contact, i) => (
                    <div key={i} className="space-y-2">
                      <p className="font-medium text-neutral-900 text-sm">{contact.name}</p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {contact.phone}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {contact.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-200 rounded-2xl overflow-hidden">
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
                <div className="p-5">
                  <p className="text-sm text-neutral-700 mb-3">{hostel.fullAddress}</p>
                  <a
                    href={hostel.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-neutral-900 hover:text-neutral-600 font-medium text-sm underline underline-offset-4"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-600 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all hostels
          </Link>
        </div>
      </div>
    </>
  );
}
