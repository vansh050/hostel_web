"use client";

import { MessageCircle } from "lucide-react";
import { BRAND_WHATSAPP } from "@/data/hostels";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi. Please share details.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} />
    </a>
  );
}
