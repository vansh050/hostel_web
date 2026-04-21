"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Star, ArrowRight, Users, DollarSign } from "lucide-react";
import { Hostel } from "@/data/hostels";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
}

export default function HostelCard({ hostel, index }: HostelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link href={`/hostel/${hostel.id}`} className="block">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={hostel.mainImage}
                alt={`${hostel.name} - ${hostel.type === "girls" ? "Girls" : "Boys"} Hostel in Lalpur, Ranchi`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Type Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${
                  hostel.type === "girls"
                    ? "bg-pink-500/90 backdrop-blur-sm"
                    : "bg-blue-500/90 backdrop-blur-sm"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                {hostel.type === "girls" ? "Girls Hostel" : "Boys Hostel"}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-1">
                {hostel.name}
              </h3>
              <p className="text-white/90 text-sm">{hostel.tagline}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-4 line-clamp-2">{hostel.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                <span>
                  {hostel.landmark}, {hostel.location}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                <span>{hostel.priceRange}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({hostel.reviews.length})
                </span>
              </div>
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                View Details
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
