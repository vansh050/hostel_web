 "use client";

  import { useState } from "react";
  import { Phone, MessageCircle } from "lucide-react";
  import LeadCaptureModal from "./LeadCaptureModal";
  import type { Hostel } from "@/data/hostels";

  type Variant = "header" | "sidebar";

  interface HostelContactButtonsProps {
    hostel: Hostel;
    variant: Variant;
  }

  export default function HostelContactButtons({
    hostel,
    variant,
  }: HostelContactButtonsProps) {
    const [openAction, setOpenAction] = useState<"call" | "whatsapp" | null>(
      null
    );

    const isHeader = variant === "header";

    const containerClass = isHeader ? "flex gap-2" : "";

    const whatsappClass = isHeader
      ? "inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
      : "block w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded-full font-medium transition-colors mb-2.5";

    const callClass = isHeader
      ? "inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
      : "block w-full text-center border border-neutral-300 hover:border-neutral-900 text-neutral-900 py-3 rounded-full font-medium transition-colors";

    const whatsappLabel = isHeader ? "WhatsApp" : "Book via WhatsApp";
    const callLabel = isHeader ? "Call" : "Call to book";

    return (
      <>
        <div className={containerClass}>
          <button
            type="button"
            onClick={() => setOpenAction("whatsapp")}
            className={whatsappClass}
          >
            {isHeader && <MessageCircle className="w-4 h-4" />}
            {whatsappLabel}
          </button>
          <button
            type="button"
            onClick={() => setOpenAction("call")}
            className={callClass}
          >
            {isHeader && <Phone className="w-4 h-4" />}
            {callLabel}
          </button>
        </div>

        <LeadCaptureModal
          isOpen={openAction !== null}
          onClose={() => setOpenAction(null)}
          hostelName={hostel.name}
          hostelPhone={hostel.contacts[0]?.phone??""}
          hostelWhatsApp={hostel.whatsapp}
          action={openAction ?? "call"}
        />
      </>
    );
  }
