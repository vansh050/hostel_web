"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star } from "lucide-react";

type Slide = {
  image: string;
  alt: string;
  hostel: string;
};

const SLIDES: Slide[] = [
  {
    image: "/images/muskan-girls-hostel/photo-08.jpeg",
    alt: "Muskan Girls Hostel — bright, clean, safe rooms in Lalpur, Ranchi",
    hostel: "Muskan Girls Hostel",
  },
  {
    image: "/images/sankalp-boys-hostel/photo-03.jpeg",
    alt: "Sankalp Boys Hostel — modern, comfortable rooms in Lalpur, Ranchi",
    hostel: "Sankalp Boys Hostel",
  },
  {
    image: "/images/sanskriti-girls-hostel/photo-01.jpeg",
    alt: "Sanskriti Girls Hostel — homely, well-managed rooms in Lalpur, Ranchi",
    hostel: "Sanskriti Girls Hostel",
  },
  {
    image: "/images/muskan-girls-hostel/photo-02.jpeg",
    alt: "Muskan Girls Hostel — common spaces and amenities",
    hostel: "Muskan Girls Hostel",
  },
];

const SLIDE_DURATION = 5500;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_DURATION
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-stone-900">
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {SLIDES.map((slide, i) =>
            i === active ? (
              <motion.div
                key={`slide-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="kenburns absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {/* Gradient wash for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-stone-950/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-transparent" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-12 bg-amber-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-amber-200">
                Lalpur, Ranchi · Since the start
              </span>
            </div>

            <h1 className="font-display text-white text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.95] tracking-tight font-medium">
              The home you didn&apos;t know
              <br />
              <span className="font-display-italic text-amber-200">
                you were looking for.
              </span>
            </h1>

            <p className="mt-7 text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed">
              Three thoughtfully-run hostels in Lalpur for students, working
              women, and exam aspirants who need more than a roof — they need a
              family.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#hostels"
                className="group inline-flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-stone-900 px-7 py-4 rounded-full font-medium tracking-wide transition-all"
              >
                Explore Hostels
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-7 py-4 rounded-full font-medium tracking-wide transition-all backdrop-blur-sm"
              >
                Schedule a Visit
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide controls + caption row */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="group h-1 overflow-hidden rounded-full bg-white/25 transition-all"
                  style={{ width: i === active ? 56 : 24 }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className={`block h-full bg-amber-200 transition-transform ${
                      i === active ? "origin-left" : ""
                    }`}
                    style={{
                      transform:
                        i === active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transitionDuration:
                        i === active ? `${SLIDE_DURATION}ms` : "0ms",
                      transitionTimingFunction: "linear",
                    }}
                    key={`bar-${active}-${i}`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2.5 text-white/70 text-xs uppercase tracking-[0.18em]">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>{SLIDES[active].hostel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative scroll indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/40 to-white/0" />
      </div>
    </section>
  );
}
