"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";

interface HostelHeroSliderProps {
  images: string[];
  hostelName: string;
  type: "girls" | "boys";
  landmark: string;
  rating: number;
  reviewCount: number;
}

const SLIDE_DURATION = 6000;

export default function HostelHeroSlider({
  images,
  hostelName,
  type,
  landmark,
  rating,
  reviewCount,
}: HostelHeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      SLIDE_DURATION
    );
    return () => clearInterval(t);
  }, [images.length, paused]);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-stone-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence>
          {images.map((src, i) =>
            i === active ? (
              <motion.div
                key={`hslide-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="kenburns absolute inset-0">
                  <Image
                    src={src}
                    alt={`${hostelName} - photo ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${
                  type === "girls" ? "bg-pink-500" : "bg-blue-500"
                }`}
              >
                {type === "girls" ? "Girls Hostel" : "Boys Hostel"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/90 text-sm">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-white/60">({reviewCount} reviews)</span>
              </span>
            </div>

            <h1 className="font-display text-white text-[clamp(2.25rem,6vw,5rem)] leading-[0.96] tracking-tight font-medium max-w-4xl">
              {hostelName}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-white/80 text-sm md:text-base">
              <MapPin className="w-4 h-4 text-amber-200" />
              <span>{landmark}, Lalpur, Ranchi</span>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div className="flex items-center gap-2.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-1 overflow-hidden rounded-full bg-white/25 transition-all"
                  style={{ width: i === active ? 56 : 24 }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className="block h-full bg-amber-200"
                    style={{
                      transform: i === active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transitionProperty: "transform",
                      transitionDuration:
                        i === active && !paused ? `${SLIDE_DURATION}ms` : "0ms",
                      transitionTimingFunction: "linear",
                    }}
                    key={`bar-${active}-${i}-${paused}`}
                  />
                </button>
              ))}
              <span className="ml-3 text-white/70 text-xs tabular-nums uppercase tracking-[0.18em]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/25 hover:bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-white/25 hover:bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
