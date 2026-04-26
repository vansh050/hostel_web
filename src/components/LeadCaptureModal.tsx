"use client";

import {useState} from "react";
import {X , Phone , MessageCircle} from "lucide-react";

interface LeadCaptureModalProps {
isOpen: boolean;
onClose: () => void;
hostelName: string;
hostelPhone: string;
hostelWhatsApp: string;
action: "call" | "whatsapp";
}

export default function LeadCaptureModal({
isOpen,
onClose,
hostelName,
hostelPhone,
hostelWhatsApp,
action,
}: LeadCaptureModalProps) {
const [name, setName]=useState("");
const [phone, setPhone]=useState("");
const [isSubmitting, setIsSubmitting]=useState(false);
const [submitError, setSubmitError]=useState("");
if(!isOpen) return null;
const actionLabel = action === "call" ? "Call" : "WhatsApp";
const ActionIcon = action === "call" ? Phone : MessageCircle;
const nameError = name.trim().length<2 ?"Please enter your name" : "";
const phoneError = /^\d{10}$/.test(phone) ? "" : "Enter a valid 10-digit phone number";
const isValid = !nameError && !phoneError;

const handleClose = () => {
  if (isSubmitting) return;
  setName("");
  setPhone("");
  setSubmitError("");
  onClose();
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if(!isValid || isSubmitting) return;
setIsSubmitting(true);
setSubmitError("");

try{
  const response =await fetch("http://localhost:5000/lead",{
  method:"POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
  hostel: hostelName,
  name: name.trim(),
  phone,
  action,
  }),
  });
  if(!response.ok) {
  const data = await response.json().catch(()=>({}));
  throw new Error(data.error || `server returned ${response.status}`);
  }

      setName("");
      setPhone("");
      setSubmitError("");
      onClose();

      const redirectUrl =
        action === "call"
          ? `tel:${hostelPhone}`
          : `https://wa.me/${hostelWhatsApp}?text=${encodeURIComponent(
              `Hi, I am ${name.trim()}. I am interested in ${hostelName}. Please share details.`
            )}`;

      window.location.href = redirectUrl;


}
catch (err){
const message=
err instanceof Error ? err.message : "Something went wrong";
setSubmitError(message);
} finally {
setIsSubmitting(false);
}


};
return (
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  onClick={handleClose}
  >
  <div
    className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
    onClick={(e)=> e.stopPropagation()}
  >
   <div className="flex items-start justify-between mb-2">
      <h2 className="text-xl font-bold text-neutral-900">
         Before we connect you
         </h2>
         <button
         type="button"
         onClick={handleClose}
         aria-label="close"
         className="text-neutral-400 hover:text-neutral-900 transition"
         >
         <X className="w-5 h-5" />
        </button>
        </div>
        <p className="text-sm text-neutral-600 mb-4">
        Help us call you back if the {actionLabel.toLowerCase()} gets
        disconnected.
        </p>
        <div className="text-xs text-neutral-500 mb-4">
        Enquiring about:{" "}
        <span className="font-medium text-neutral-900">{hostelName}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
        <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
        Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma"
         aria-invalid={!!nameError}
         className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
         nameError
         ? "border-red-400 focus:ring-red-500"
         : "border-neutral-300 focus:ring-neutral-900"
         }`}
          />
          {nameError && (
          <p className ="mt-1 text-xs text-red-600">{nameError}</p>
          )}
          </div>

          <div>
          <label className ="block text-sm font-medium text-neutral-700 mb-1">
          Phone Number
          </label>
          <input
          type="tel"
          value={phone}
          onChange={(e)=> setPhone(e.target.value.replace(/\D/g,"").slice(0,10))
          }
          placeholder="10-digit number"
          inputMode="numeric"
          aria-invalid={!!phoneError}
          className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
          phoneError
          ? "border-red-400 focus:ring-red-500"
          : "border-neutral-300 focus:ring-neutral-900"
          }`}


          />
          {phoneError && (
          <p className="mt-1 text-xs text-red-600">{phoneError}</p>
          )}
          </div>
        {submitError && (
        <p className ="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        {submitError}
        </p>
        )}
          <div className="flex gap-2 pt-2">
          <button
          type="button"
          onClick={handleClose}
          disabled={isSubmitting}
          className="flex-1 rounded-full border border-neutral-300 py-2.5 font-medium hover:bg-neutral-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
          Cancel
          </button>
          <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 text-white py-2.5 font-medium
          hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
          >
          {isSubmitting ? (
          "Submitting..."
          ): (
          <>

           <ActionIcon className="w-4 h-4" />
           {actionLabel} Now
           </>
           )}
           </button>
          </div>
         </form>
        </div>
       </div>
       );
      }


