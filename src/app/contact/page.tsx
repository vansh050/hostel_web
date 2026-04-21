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
  description: `Contact ${BRAND_NAME} for hostel booking enquiries in Ranchi. Call, WhatsApp, or visit our hostels in Lalpur, Ranchi. We are happy to help you find the perfect accommodation.`,
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Have questions about our hostels? Want to book a room or schedule a
            visit? We are here to help!
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              {/* Quick Contact */}
              <div className="space-y-4 mb-8">
                <a
                  href={`tel:${BRAND_PHONE}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us</p>
                    <p className="text-gray-600 text-sm">{BRAND_PHONE}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-gray-600 text-sm">
                      Quick response guaranteed
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND_EMAIL}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Us</p>
                    <p className="text-gray-600 text-sm">{BRAND_EMAIL}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Visit Hours</p>
                    <p className="text-gray-600 text-sm">
                      10:00 AM - 7:00 PM (All days)
                    </p>
                  </div>
                </div>
              </div>

              {/* Hostel Addresses */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Hostel Locations
              </h3>
              <div className="space-y-4">
                {hostelsData.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="p-4 bg-white rounded-xl shadow-sm"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {hostel.name}
                    </h4>
                    <p className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                      {hostel.fullAddress} - {hostel.pincode}
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        href={`tel:${hostel.contacts[0]?.phone}`}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        {hostel.contacts[0]?.phone}
                      </a>
                      <a
                        href={hostel.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Us on the Map
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
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
