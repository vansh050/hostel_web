"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { hostelsData, BRAND_WHATSAPP } from "@/data/hostels";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hostel: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hostelName = formData.hostel
      ? hostelsData.find((h) => h.id === formData.hostel)?.name || formData.hostel
      : "Not specified";

    const whatsappMessage = `
*New Enquiry from Website*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Interested In: ${hostelName}
Message: ${formData.message}
    `.trim();

    window.open(
      `https://wa.me/${BRAND_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );

    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-colors bg-white text-neutral-900 placeholder:text-neutral-400";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-neutral-200 text-center">
        <CheckCircle className="w-14 h-14 text-neutral-900 mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Message sent
        </h3>
        <p className="text-neutral-600 mb-6 text-sm">
          Thank you for your enquiry. We will get back to you as soon as
          possible.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", email: "", hostel: "", message: "" });
          }}
          className="text-sm text-neutral-900 font-medium underline underline-offset-4 hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-1.5">
          Your name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-1.5">
          Phone number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-1.5">
          Email <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="hostel" className="block text-sm font-medium text-neutral-900 mb-1.5">
          Interested in
        </label>
        <select
          id="hostel"
          value={formData.hostel}
          onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
          className={inputClass}
        >
          <option value="">Select a hostel</option>
          {hostelsData.map((hostel) => (
            <option key={hostel.id} value={hostel.id}>
              {hostel.name} ({hostel.type === "girls" ? "Girls" : "Boys"})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-1.5">
          Your message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="E.g., I am looking for a double sharing room from next month..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-lg font-medium transition-colors"
      >
        <Send className="w-4 h-4" />
        Send enquiry via WhatsApp
      </button>

      <p className="text-xs text-neutral-500 text-center">
        This form sends your enquiry directly to our WhatsApp. We typically
        respond within 30 minutes during business hours.
      </p>
    </form>
  );
}
