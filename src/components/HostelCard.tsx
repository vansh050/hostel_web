"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { Hostel } from "@/data/hostels";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
}

export default function HostelCard({ hostel, index }: HostelCardProps) {
  const isGirls = hostel.type === "girls";
  const startingPrice = hostel.priceRange
    .split(" - ")[0]
    .replace("Rs ", "₹");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/hostel/${hostel.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-6 rounded-sm">
          <Image
            src={hostel.mainImage}
            alt={`${hostel.name} - ${isGirls ? "Girls" : "Boys"} Hostel in Lalpur, Ranchi`}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-stone-950/5 to-transparent" />

          {/* Number marker — magazine style */}
          <div className="absolute top-5 left-5">
            <span
              className="font-display text-white/85 text-3xl font-medium tracking-tight"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Type pill — top right */}
          <div className="absolute top-5 right-5">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] text-white ${
                isGirls ? "bg-pink-500" : "bg-blue-500"
              }`}
            >
              {isGirls ? "Girls" : "Boys"}
            </span>
          </div>

          {/* Bottom info — overlay */}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span className="font-medium">5.0</span>
              <span className="text-white/60">·</span>
              <span className="text-white/70">
                {hostel.reviews.length} reviews
              </span>
            </div>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/95 text-stone-900 group-hover:bg-amber-200 transition-colors">
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2 flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            {hostel.landmark}
          </p>
          <h3
            className="font-display text-2xl md:text-[1.65rem] leading-[1.1] tracking-tight font-medium mb-4 transition-colors"
            style={{ color: "var(--color-ink)" }}
          >
            {hostel.name}
          </h3>

          <div className="flex items-end justify-between border-t border-stone-200 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-1">
                Starting from
              </p>
              <p className="font-display text-2xl font-medium tracking-tight">
                {startingPrice}
                <span className="text-sm font-normal text-stone-500 ml-1">
                  / month
                </span>
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone-700 group-hover:text-stone-900 inline-flex items-center gap-1.5 transition-all">
              Read more
              <span className="block h-px w-6 bg-current group-hover:w-10 transition-all duration-300" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
