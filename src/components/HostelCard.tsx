"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  MapPin,
  Star,
  ArrowRight,
  Users,
  Shield,
  Utensils,
  Wifi,
} from "lucide-react";
import { Hostel } from "@/data/hostels";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
}

const HIGHLIGHTS = [
  { icon: Shield, label: "24/7 Security" },
  { icon: Utensils, label: "Home Food" },
  { icon: Wifi, label: "Free Wi-Fi" },
];

type Theme = {
  ring: string;
  hoverRing: string;
  glow: string;
  price: string;
  chipHover: string;
  button: string;
  shadowHover: string;
};

const THEMES: Theme[] = [
  // Muskan Girls — Rose
  {
    ring: "ring-rose-100",
    hoverRing: "group-hover:ring-rose-300",
    glow: "from-rose-400 via-pink-400 to-rose-500",
    price: "text-rose-600",
    chipHover:
      "group-hover:bg-rose-50 group-hover:border-rose-200 group-hover:text-rose-700",
    button: "bg-neutral-900 group-hover:bg-rose-500",
    shadowHover: "group-hover:shadow-rose-400/25",
  },
  // Sanskriti Girls — Amber / Peach
  {
    ring: "ring-amber-100",
    hoverRing: "group-hover:ring-amber-300",
    glow: "from-amber-400 via-orange-400 to-amber-500",
    price: "text-amber-700",
    chipHover:
      "group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-700",
    button: "bg-neutral-900 group-hover:bg-amber-500",
    shadowHover: "group-hover:shadow-amber-400/25",
  },
  // Sankalp Boys — Indigo
  {
    ring: "ring-indigo-100",
    hoverRing: "group-hover:ring-indigo-300",
    glow: "from-indigo-400 via-violet-400 to-indigo-500",
    price: "text-indigo-600",
    chipHover:
      "group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-700",
    button: "bg-neutral-900 group-hover:bg-indigo-500",
    shadowHover: "group-hover:shadow-indigo-400/25",
  },
];

export default function HostelCard({ hostel, index }: HostelCardProps) {
  const theme = THEMES[index % THEMES.length];
  const isGirls = hostel.type === "girls";
  const startingPrice = hostel.priceRange.split(" - ")[0].replace("Rs ", "₹");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="group relative"
    >
      {/* Colored halo on hover */}
      <div
        className={`absolute -inset-1.5 bg-gradient-to-br ${theme.glow} rounded-[2rem] opacity-0 group-hover:opacity-25 blur-xl transition-all duration-500 pointer-events-none`}
      />

      <Link
        href={`/hostel/${hostel.id}`}
        className={`relative block rounded-[1.75rem] overflow-hidden bg-white ring-1 ${theme.ring} ${theme.hoverRing} group-hover:ring-2 shadow-lg shadow-neutral-900/5 ${theme.shadowHover} group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1.5`}
      >
        {/* Image */}
        <div className="relative aspect-[4/5]">
          <Image
            src={hostel.mainImage}
            alt={`${hostel.name} - ${isGirls ? "Girls" : "Boys"} Hostel in Lalpur, Ranchi`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient wash for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/15" />

          {/* Top row: type pill + rating */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <span
              className={`inline-flex items-center gap-1.5 ${
                isGirls ? "bg-pink-500" : "bg-blue-500"
              } text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg`}
            >
              <Users className="w-3 h-3" strokeWidth={2.5} />
              {isGirls ? "Girls Hostel" : "Boys Hostel"}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-neutral-900">5.0</span>
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white text-2xl font-bold tracking-tight leading-tight mb-1.5">
              {hostel.name}
            </h3>
            <p className="text-white/90 text-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {hostel.landmark}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 bg-white">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h.label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-700 font-medium transition-colors duration-300 ${theme.chipHover}`}
              >
                <h.icon className="w-3 h-3" strokeWidth={2} />
                {h.label}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500 font-semibold mb-0.5">
                Starting from
              </p>
              <p
                className={`text-2xl font-bold ${theme.price} leading-none transition-colors duration-300`}
              >
                {startingPrice}
                <span className="text-sm font-medium text-neutral-400 ml-0.5">
                  /mo
                </span>
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 ${theme.button} text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 shadow-md`}
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
