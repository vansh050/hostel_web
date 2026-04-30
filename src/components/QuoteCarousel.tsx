"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  hostel: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Best girls hostel in Lalpur. The food is amazing and the rooms are very clean. I feel completely safe here. The aunty takes care of us like family.",
    name: "Priya Kumari",
    role: "Resident, 2 years",
    hostel: "Muskan Girls Hostel",
  },
  {
    quote:
      "I came to Ranchi for JPSC preparation and this hostel has been perfect. Quiet environment, good study hall, and the location is very convenient. Thank you Sanskriti!",
    name: "Kavita Devi",
    role: "JPSC Aspirant",
    hostel: "Sanskriti Girls Hostel",
  },
  {
    quote:
      "Excellent hostel for boys in Ranchi. Clean rooms, tasty food, and the staff is very cooperative. The Lalpur location makes coaching classes and markets easy to reach.",
    name: "Rahul Kumar",
    role: "Engineering Student",
    hostel: "Sankalp Boys Hostel",
  },
  {
    quote:
      "I've been here for 2 years. Very homely environment, good food, and the location is perfect — close to everything in Lalpur. Highly recommended.",
    name: "Sneha Sharma",
    role: "Working Professional",
    hostel: "Muskan Girls Hostel",
  },
  {
    quote:
      "Sanskriti is genuinely the best hostel for girls in Ranchi. The warden is caring, the food is healthy and tasty, and the rooms are spacious. I recommend it to everyone.",
    name: "Ritu Verma",
    role: "Resident",
    hostel: "Sanskriti Girls Hostel",
  },
];

const ROTATE_MS = 6500;

export default function QuoteCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % TESTIMONIALS.length),
      ROTATE_MS
    );
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Quote
        className="w-12 h-12 md:w-16 md:h-16 text-saffron mb-6"
        strokeWidth={1.25}
      />

      <div className="relative min-h-[260px] md:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="font-display text-stone-900 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-tight font-normal">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-saffron/10 ring-1 ring-saffron/20 flex items-center justify-center">
                <span className="text-saffron font-medium text-sm">
                  {current.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-medium text-stone-900 text-sm">
                  {current.name}
                </p>
                <p className="text-stone-500 text-xs mt-0.5">
                  {current.role} · {current.hostel}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-10 flex items-center gap-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-8 bg-saffron"
                : "w-1.5 bg-stone-300 hover:bg-stone-400"
            }`}
            style={
              i === active
                ? { backgroundColor: "var(--color-saffron)" }
                : undefined
            }
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
        <span className="ml-3 text-xs text-stone-400 tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
