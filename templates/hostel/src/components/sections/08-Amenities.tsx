"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIconMap: Record<string, string> = {
  "Free Wi-Fi": "wifi",
  "Hot Water": "droplet",
  "Shared Kitchen": "chef",
  "Personal Lockers": "lock",
  "Rooftop Terrace": "sunset",
  "Laundry Service": "shirt",
  "Book Exchange": "book",
  "Yoga Space": "lotus",
  "Guitar Corner": "music",
  "Travel Desk": "map",
  "Filtered Water": "water",
  "Common Room": "sofa",
  "Board Games": "dice",
  "Chai Station": "cup",
  "Luggage Storage": "bag",
};

function AmenityIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    wifi: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M5 12.55a11 11 0 0114 0" />
        <path d="M8.5 16.45a6 6 0 017 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </g>
    ),
    droplet: <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    chef: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 18h16M6 14v4M18 14v4M6 14a4 4 0 014-4h4a4 4 0 014 4" /></g>,
    lock: <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></g>,
    sunset: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17h18M5 14l2-2 3 2 4-4 5 4" /><circle cx="17" cy="7" r="3" /></g>,
    shirt: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l4 2v14h8V6l4-2-3-2h-4l-1 2-1-2H7z" /></g>,
    book: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h6a2 2 0 012 2v14a1 1 0 00-1-1H4zM20 4h-6a2 2 0 00-2 2v14a1 1 0 011-1h7z" /></g>,
    lotus: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21c-4-4-8-8-8-13a8 8 0 0116 0c0 5-4 9-8 13z" /><path d="M12 3v18" /></g>,
    music: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></g>,
    map: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></g>,
    water: <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
    sofa: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v6h16v-6" /><path d="M2 12a2 2 0 014 0M18 12a2 2 0 014 0" /><path d="M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4" /></g>,
    dice: <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1" fill="currentColor" /><circle cx="16" cy="8" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="16" cy="16" r="1" fill="currentColor" /></g>,
    cup: <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h12v8a4 4 0 01-4 4H9a4 4 0 01-4-4z" /><path d="M17 10h2a2 2 0 010 4h-2" /></g>,
    bag: <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="7" width="16" height="14" rx="2" /><path d="M8 7V5a4 4 0 018 0v2" /></g>,
  };

  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className="text-terracotta">
      {paths[type] ?? (
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

export function Amenities({ amenities }: AmenitiesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lay amenities in an orbit pattern
  const radius = 200;
  const centerItem = "Your Home Base";

  return (
    <section className="py-24 sm:py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Amenities
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-16">
          What we&apos;ve got
        </h2>

        {/* Desktop: circular orbit */}
        <div className="hidden md:block">
          <div
            className="relative mx-auto"
            style={{ width: radius * 2 + 120, height: radius * 2 + 120 }}
          >
            {/* Center label */}
            <div
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-24 h-24 rounded-full bg-terracotta/10 border-2 border-dashed border-terracotta/30 flex items-center justify-center">
                <span className="font-handwritten text-sm text-terracotta text-center leading-tight px-2">
                  {centerItem}
                </span>
              </div>
            </div>

            {/* Orbit ring */}
            <div
              className="absolute rounded-full border border-dashed border-sand/50"
              style={{
                left: "50%",
                top: "50%",
                width: radius * 2,
                height: radius * 2,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Amenity nodes */}
            {amenities.map((amenity, i) => {
              const angle = (i / amenities.length) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const iconKey = amenityIconMap[amenity] ?? "cup";
              const isHovered = hoveredIndex === i;

              return (
                <motion.div
                  key={amenity}
                  className="absolute z-20"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isHovered
                          ? "bg-terracotta text-white shadow-lg"
                          : "bg-white text-terracotta shadow-sm"
                      }`}
                    >
                      <AmenityIcon type={iconKey} />
                    </div>
                    <motion.span
                      className="font-mono text-[10px] tracking-wider text-charcoal/70 whitespace-nowrap text-center max-w-[80px]"
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                      {amenity}
                    </motion.span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: simple grid */}
        <div className="md:hidden grid grid-cols-3 gap-4">
          {amenities.map((amenity, i) => {
            const iconKey = amenityIconMap[amenity] ?? "cup";
            return (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex flex-col items-center gap-2 p-3"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <AmenityIcon type={iconKey} />
                </div>
                <span className="font-mono text-[10px] tracking-wider text-warm-gray text-center">
                  {amenity}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
