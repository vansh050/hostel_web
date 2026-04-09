import { motion } from "motion/react";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Hostel } from "../data/hostels";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
}

export function HostelCard({ hostel, index }: HostelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/hostel/${hostel.id}`} className="block">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={hostel.mainImage}
              alt={hostel.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-1">{hostel.name}</h3>
              <p className="text-white/90 text-sm">{hostel.tagline}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-4 line-clamp-2">{hostel.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span>{hostel.location}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                <span>{hostel.priceRange}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
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
