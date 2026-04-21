"use client";

import { motion } from "motion/react";
import {
  Plane,
  MapPin,
  Backpack,
  Globe,
  Compass,
  Camera,
  Map,
  Users,
  Star,
  Coffee,
  Wifi,
  Bed,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  const travelIcons = [
    { Icon: Plane, color: "text-blue-400" },
    { Icon: MapPin, color: "text-red-400" },
    { Icon: Backpack, color: "text-green-400" },
    { Icon: Globe, color: "text-purple-400" },
    { Icon: Compass, color: "text-orange-400" },
    { Icon: Camera, color: "text-pink-400" },
    { Icon: Map, color: "text-teal-400" },
    { Icon: Users, color: "text-indigo-400" },
    { Icon: Star, color: "text-yellow-400" },
    { Icon: Coffee, color: "text-amber-400" },
    { Icon: Wifi, color: "text-cyan-400" },
    { Icon: Bed, color: "text-violet-400" },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      {/* Soft gradient orbs for depth */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating travel icons */}
      {travelIcons.map((item, i) => (
        <motion.div
          key={`icon-${i}`}
          className={`absolute ${item.color} opacity-20`}
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={40 + (i % 3) * 20} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Animated plane trails */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`plane-trail-${i}`}
          className="absolute"
          style={{
            top: `${20 + i * 30}%`,
            left: -100,
          }}
          animate={{
            x: [-100, windowWidth + 100],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 7,
            ease: "linear",
          }}
        >
          <div className="flex items-center gap-2">
            <Plane className="text-blue-400 opacity-40" size={32} />
            <div className="flex gap-1">
              {[...Array(20)].map((_, j) => (
                <motion.div
                  key={j}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: j * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map pins dropping animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`pin-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: -50,
          }}
          animate={{
            y: [-50, windowHeight + 50],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeIn",
          }}
        >
          <MapPin className="text-red-400 opacity-30" size={28} />
        </motion.div>
      ))}

      {/* Rotating compasses */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`compass-${i}`}
          className="absolute text-orange-400 opacity-20"
          style={{
            left: `${25 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Compass size={48} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Pulsing location circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`location-pulse-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${40 + i * 10}%`,
          }}
        >
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={j}
              className="absolute top-0 left-0 rounded-full border-2 border-blue-400"
              initial={{ width: 20, height: 20, opacity: 0.5 }}
              animate={{
                width: [20, 100, 20],
                height: [20, 100, 20],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: j * 1 + i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-400"
          style={{
            left: `${(i * 5.2 + 3) % 100}%`,
            top: `${(i * 7.3 + 5) % 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: (i % 5) * 0.6,
            ease: "easeInOut",
          }}
        >
          <Star size={12 + (i % 4) * 3} fill="currentColor" strokeWidth={1} />
        </motion.div>
      ))}

      {/* Connecting dots */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(10)].map((_, i) => {
          const x1 = ((i * 13 + 5) % 100);
          const y1 = ((i * 17 + 10) % 100);
          const x2 = ((i * 11 + 40) % 100);
          const y2 = ((i * 19 + 30) % 100);

          return (
            <motion.line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Globe with orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Globe size={200} strokeWidth={0.5} className="text-indigo-400" />
      </motion.div>
    </div>
  );
}
