import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Navigation,
} from "lucide-react";
import {
  BRAND_NAME,
  BRAND_PHONE,
  BRAND_EMAIL,
  BRAND_WHATSAPP,
  hostelsData,
} from "@/data/hostels";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us - ${BRAND_NAME} | Hostels in Ranchi`,
  description: `Contact ${BRAND_NAME} for hostel booking enquiries in Ranchi. Call, WhatsApp, or visit our hostels in Lalpur, Ranchi.`,
  alternates: {
    canonical: "https://lalpurhostels.com/contact",
  },
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${BRAND_NAME}`,
    description: `Get in touch with ${BRAND_NAME} for hostel enquiries in Ranchi.`,
    mainEntity: {
      "@type": "Organization",
      name: BRAND_NAME,
      telephone: BRAND_PHONE,
      email: BRAND_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ranchi",
        addressRegion: "Jharkhand",
        postalCode: "834001",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-6">
            — Contact
          </p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.96] tracking-tight font-medium max-w-4xl">
            Come over for{" "}
            <span
              className="font-display-italic"
              style={{ color: "var(--color-saffron)" }}
            >
              tea.
            </span>
          </h1>
          <p className="text-lg text-stone-600 mt-6 max-w-2xl leading-relaxed">
            Have questions about our hostels? Want to book a room or schedule a
            visit? We are here to help — call, WhatsApp, or drop us a line.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Reach us directly
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,2.5rem)] leading-[1.1] tracking-tight font-medium mb-8">
                Three ways to talk.
              </h2>

              <div className="space-y-3 mb-12">
                <a
                  href={`tel:${BRAND_PHONE}`}
                  className="flex items-center gap-5 p-5 bg-white border border-stone-200 hover:border-stone-900 transition-colors group"
                >
                  <Phone
                    className="w-5 h-5 flex-shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-1">
                      Call us
                    </p>
                    <p className="font-display text-lg font-medium tracking-tight">
                      {BRAND_PHONE}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 bg-white border border-stone-200 hover:border-stone-900 transition-colors group"
                >
                  <MessageCircle
                    className="w-5 h-5 flex-shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-1">
                      WhatsApp
                    </p>
                    <p className="font-display text-lg font-medium tracking-tight">
                      Quick response, any time
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND_EMAIL}`}
                  className="flex items-center gap-5 p-5 bg-white border border-stone-200 hover:border-stone-900 transition-colors group"
                >
                  <Mail
                    className="w-5 h-5 flex-shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-1">
                      Email us
                    </p>
                    <p className="font-display text-lg font-medium tracking-tight">
                      {BRAND_EMAIL}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-5 p-5 bg-white border border-stone-200">
                  <Clock
                    className="w-5 h-5 flex-shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-1">
                      Visit hours
                    </p>
                    <p className="font-display text-lg font-medium tracking-tight">
                      10:00 AM – 7:00 PM (All days)
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-xl font-medium tracking-tight mb-5">
                Hostel locations
              </h3>
              <div className="space-y-4">
                {hostelsData.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="bg-white border border-stone-200 overflow-hidden"
                  >
                    <iframe
                      src={hostel.googleMapsEmbed}
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${hostel.name} location on Google Maps`}
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-block text-[10px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full text-white ${
                            hostel.type === "girls"
                              ? "bg-pink-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {hostel.type === "girls" ? "Girls" : "Boys"}
                        </span>
                        <h4 className="font-display text-lg font-medium tracking-tight">
                          {hostel.name}
                        </h4>
                      </div>
                      <p className="flex items-start gap-2 text-stone-600 text-sm mb-3 leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-stone-400" />
                        {hostel.fullAddress} - {hostel.pincode}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <a
                          href={`tel:${hostel.contacts[0]?.phone}`}
                          className="font-medium underline underline-offset-4"
                          style={{ color: "var(--color-saffron)" }}
                        >
                          {hostel.contacts[0]?.phone}
                        </a>
                        <a
                          href={hostel.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium underline underline-offset-4"
                          style={{ color: "var(--color-saffron)" }}
                        >
                          <Navigation className="w-3 h-3" />
                          Directions
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
                — Send a message
              </p>
              <h2 className="font-display text-[clamp(1.875rem,4vw,2.5rem)] leading-[1.1] tracking-tight font-medium mb-8">
                We&apos;ll respond fast.
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-5">
            — Find us
          </p>
          <h2 className="font-display text-[clamp(1.875rem,4vw,2.5rem)] leading-[1.1] tracking-tight font-medium mb-8">
            All in Lalpur, Ranchi.
          </h2>
          <div className="rounded-sm overflow-hidden border border-stone-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14651.2!2d85.31!3d23.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1e8cbda25f7%3A0x830e5fe8648ccb39!2sLalpur%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lalpur, Ranchi - Hostel Locations"
            />
          </div>
        </div>
      </section>
    </>
  );
}
