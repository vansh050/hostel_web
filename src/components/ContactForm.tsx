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
      ? hostelsData.find((h) => h.id === formData.hostel)?.name ||
        formData.hostel
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
    "w-full px-4 py-3.5 border border-stone-200 rounded-sm focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-colors bg-white text-stone-900 placeholder:text-stone-400 text-[0.95rem]";

  if (submitted) {
    return (
      <div className="bg-white p-10 border border-stone-200 rounded-sm text-center">
        <CheckCircle
          className="w-14 h-14 mx-auto mb-5"
          strokeWidth={1.25}
          style={{ color: "var(--color-saffron)" }}
        />
        <h3 className="font-display text-2xl font-medium tracking-tight mb-3">
          Message sent.
        </h3>
        <p className="text-stone-600 mb-6 text-sm">
          Thank you for your enquiry. We will get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              hostel: "",
              message: "",
            });
          }}
          className="text-sm font-medium underline underline-offset-4"
          style={{ color: "var(--color-saffron)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-7 md:p-9 border border-stone-200 rounded-sm space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2"
        >
          Your name <span className="text-pink-500 normal-case">*</span>
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
        <label
          htmlFor="phone"
          className="block text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2"
        >
          Phone number <span className="text-pink-500 normal-case">*</span>
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
        <label
          htmlFor="email"
          className="block text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2"
        >
          Email <span className="text-stone-400 normal-case">(optional)</span>
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
        <label
          htmlFor="hostel"
          className="block text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2"
        >
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
        <label
          htmlFor="message"
          className="block text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2"
        >
          Your message <span className="text-pink-500 normal-case">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className={`${inputClass} resize-none`}
          placeholder="E.g., I am looking for a single room from next month..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-full font-medium transition-colors"
        style={{ backgroundColor: "var(--color-ink)" }}
      >
        <Send className="w-4 h-4" />
        Send enquiry via WhatsApp
      </button>

      <p className="text-xs text-stone-500 text-center pt-2">
        This form sends your enquiry directly to our WhatsApp.
      </p>
    </form>
  );
}
