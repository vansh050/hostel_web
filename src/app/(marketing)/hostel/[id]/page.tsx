import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { hostelsData, BRAND_NAME } from "@/data/hostels";
import ReviewCard from "@/components/ReviewCard";
import HostelGallery from "@/components/HostelGallery";
import HostelHeroSlider from "@/components/HostelHeroSlider";
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

  const allImages = [hostel.mainImage, ...hostel.gallery];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hostel.name,
    description: hostel.description,
    image: allImages,
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

      {/* Full-screen hero slider */}
      <HostelHeroSlider
        images={allImages}
        hostelName={hostel.name}
        type={hostel.type}
        landmark={hostel.landmark}
        rating={averageRating}
        reviewCount={hostel.reviews.length}
      />

      {/* Sticky CTA bar */}
      <div className="bg-white border-b border-stone-200 sticky top-[72px] md:top-[84px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-900">
              Home
            </Link>
            <span className="text-stone-300">/</span>
            <Link href="/#hostels" className="hover:text-stone-900">
              Hostels
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-medium">{hostel.name}</span>
          </div>
          <HostelContactButtons hostel={hostel} variant="header" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-20 md:space-y-24">
            {/* About — magazine intro with drop cap */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — About this hostel
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-8">
                A second home in Lalpur,{" "}
                <span
                  className="font-display-italic"
                  style={{ color: "var(--color-saffron)" }}
                >
                  built on care.
                </span>
              </h2>
              <p
                className="text-stone-700 leading-relaxed text-[1.0625rem] [&::first-letter]:font-display [&::first-letter]:text-6xl [&::first-letter]:float-left [&::first-letter]:leading-[0.85] [&::first-letter]:mr-3 [&::first-letter]:mt-1 [&::first-letter]:font-medium"
                style={
                  {
                    "--color-first": "var(--color-saffron)",
                  } as React.CSSProperties
                }
              >
                {hostel.description}
              </p>
            </section>

            {/* Room types */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Rooms & pricing
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                Two ways to stay.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {hostel.roomTypes.map((room, i) => (
                  <div
                    key={room.name}
                    className="relative bg-white border border-stone-200 p-7 md:p-8 rounded-sm hover:border-stone-900 transition-colors"
                  >
                    <span
                      className="absolute -top-3 left-7 px-2 text-[10px] uppercase tracking-[0.22em] font-medium"
                      style={{
                        backgroundColor: "var(--color-cream)",
                        color: "var(--color-saffron)",
                      }}
                    >
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-medium tracking-tight mb-2">
                      {room.name}
                    </h3>
                    <p className="font-display text-3xl font-medium tracking-tight mb-6">
                      {room.price.replace("Rs ", "₹")}
                    </p>
                    <ul className="space-y-2.5">
                      {room.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-stone-700"
                        >
                          <Check
                            className="w-3.5 h-3.5 flex-shrink-0"
                            strokeWidth={2.5}
                            style={{ color: "var(--color-saffron)" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Amenities & facilities
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                Everything taken care of.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                {hostel.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 text-sm py-2 border-b border-stone-100"
                  >
                    <Check
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={2}
                      style={{ color: "var(--color-saffron)" }}
                    />
                    <span className="text-stone-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery — grid below */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — A look inside
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                Browse the full gallery.
              </h2>
              <HostelGallery images={allImages} hostelName={hostel.name} />
            </section>

            {/* Nearby */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — In the neighborhood
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                What&apos;s around.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                {hostel.nearbyAttractions.map((place) => (
                  <li
                    key={place}
                    className="flex items-start gap-3 text-sm py-2 border-b border-stone-100"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-stone-400" />
                    <span className="text-stone-700">{place}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Voices from inside
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                What residents say.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {hostel.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Common questions
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-tight font-medium mb-10">
                Things people ask us.
              </h2>
              <div className="border-t border-stone-200">
                {hostel.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border-b border-stone-200"
                  >
                    <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none">
                      <span className="font-display text-lg md:text-xl tracking-tight font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown className="w-5 h-5 text-stone-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <p className="pb-6 text-stone-600 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-40 space-y-6">
              <div className="bg-white border border-stone-200 rounded-sm p-7">
                <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">
                  Starting from
                </p>
                <p className="font-display text-4xl font-medium tracking-tight mb-2">
                  {hostel.priceRange.split(" - ")[0]}
                  <span className="text-base font-normal text-stone-500 ml-1">
                    / month
                  </span>
                </p>
                <p className="text-xs text-stone-500 mb-7">
                  Including {hostel.type === "girls" ? "4" : "3"} home-cooked
                  meals daily
                </p>

                <HostelContactButtons hostel={hostel} variant="sidebar" />

                <div className="mt-7 pt-6 border-t border-stone-100 space-y-3">
                  {hostel.contacts.map((contact, i) => (
                    <div key={i} className="space-y-2">
                      <p className="font-medium text-stone-900 text-sm">
                        {contact.name}
                      </p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {contact.phone}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {contact.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
                <iframe
                  src={hostel.googleMapsEmbed}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${hostel.name} location on Google Maps`}
                />
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">
                    Address
                  </p>
                  <p className="text-sm text-stone-700 mb-4 leading-relaxed">
                    {hostel.fullAddress}
                  </p>
                  <a
                    href={hostel.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                    style={{ color: "var(--color-saffron)" }}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 pt-10 border-t border-stone-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all hostels
          </Link>
        </div>
      </div>
    </>
  );
}
