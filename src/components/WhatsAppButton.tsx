"use client";

import { MessageCircle } from "lucide-react";
import { BRAND_WHATSAPP } from "@/data/hostels";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi. Please share details.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1eba56] text-white shadow-xl shadow-emerald-500/20 transition-all group-hover:scale-105">
        <MessageCircle className="w-6 h-6" strokeWidth={2} />
      </span>
    </a>
  );
}
