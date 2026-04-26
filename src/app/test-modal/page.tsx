 "use client";

  import { useState } from "react";
  import LeadCaptureModal from "@/components/LeadCaptureModal";

  export default function TestModalPage() {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<"call" | "whatsapp">("call");

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Modal Test Page</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAction("call");
              setOpen(true);
            }}
            className="rounded-full bg-neutral-900 text-white px-6 py-3"
          >
            Test Call
          </button>
          <button
            onClick={() => {
              setAction("whatsapp");
              setOpen(true);
            }}
            className="rounded-full bg-green-600 text-white px-6 py-3"
          >
            Test WhatsApp
          </button>
        </div>

        <LeadCaptureModal
          isOpen={open}
          onClose={() => setOpen(false)}
          hostelName="Muskan Girls Hostel"
          action={action}
        />
      </div>
    );
  }

