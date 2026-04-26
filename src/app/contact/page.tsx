import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Navigation,
} from "lucide-react";
import { BRAND_NAME, BRAND_PHONE, BRAND_EMAIL, BRAND_WHATSAPP, hostelsData } from "@/data/hostels";
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-16">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-4">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Get in touch.
        </h1>
        <p className="text-lg text-neutral-600 mt-5 max-w-2xl">
          Have questions about our hostels? Want to book a room or schedule a
          visit? We are here to help.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 pt-14 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Reach us directly
              </h2>

              <div className="space-y-3 mb-10">
                <a
                  href={`tel:${BRAND_PHONE}`}
                  className="flex items-center gap-4 p-5 border border-neutral-200 rounded-2xl hover:border-neutral-900 transition-colors"
                >
                  <Phone className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Call us</p>
                    <p className="text-neutral-500 text-sm">{BRAND_PHONE}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 border border-neutral-200 rounded-2xl hover:border-neutral-900 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">WhatsApp</p>
                    <p className="text-neutral-500 text-sm">Quick response guaranteed</p>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND_EMAIL}`}
                  className="flex items-center gap-4 p-5 border border-neutral-200 rounded-2xl hover:border-neutral-900 transition-colors"
                >
                  <Mail className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Email us</p>
                    <p className="text-neutral-500 text-sm">{BRAND_EMAIL}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 border border-neutral-200 rounded-2xl">
                  <Clock className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Visit hours</p>
                    <p className="text-neutral-500 text-sm">10:00 AM – 7:00 PM (All days)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Hostel locations
              </h3>
              <div className="space-y-3">
                {hostelsData.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="p-5 border border-neutral-200 rounded-2xl"
                  >
                    <h4 className="font-medium text-neutral-900 mb-1.5 text-sm">
                      {hostel.name}
                    </h4>
                    <p className="flex items-start gap-2 text-neutral-600 text-sm mb-3 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-neutral-400" />
                      {hostel.fullAddress} - {hostel.pincode}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <a
                        href={`tel:${hostel.contacts[0]?.phone}`}
                        className="text-neutral-900 font-medium underline underline-offset-4 hover:no-underline"
                      >
                        {hostel.contacts[0]?.phone}
                      </a>
                      <a
                        href={hostel.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-900 font-medium underline underline-offset-4 hover:no-underline"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 pt-14">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
            Find us on the map
          </h2>
          <div className="rounded-2xl overflow-hidden border border-neutral-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14651.2!2d85.31!3d23.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1e8cbda25f7%3A0x830e5fe8648ccb39!2sLalpur%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
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
