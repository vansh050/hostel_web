"use client";

import { MessageCircle } from "lucide-react";
import { BRAND_WHATSAPP } from "@/data/hostels";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND_WHATSAPP}?text=Hi, I want to enquire about hostel rooms in Ranchi. Please share details.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
