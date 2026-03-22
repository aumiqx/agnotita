"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface AmenitiesProps {
  amenities: string[];
}

const amenityDescriptions: Record<string, string> = {
  "Free WiFi": "Complimentary high-speed wireless connectivity throughout the property",
  "Infinity Pool": "Heated pool with panoramic views, open sunrise to sunset",
  "Yoga Deck": "Riverside platform for daily guided sessions at dawn and dusk",
  "Ayurvedic Spa": "Traditional treatments tailored to your unique constitution",
  "Rooftop Restaurant": "Farm-to-table dining with Himalayan views",
  "Room Service": "In-room dining available throughout your stay",
  "Valet Parking": "Complimentary valet service for all guests",
  "Laundry & Pressing": "Same-day laundry and pressing service",
  "Fitness Centre": "State-of-the-art equipment with mountain views",
  "Library & Reading Room": "Curated collection of literature and travel writing",
  "Meditation Garden": "A tranquil space for contemplation and stillness",
  "River Access": "Private steps leading down to the Ganges",
  "Concierge Desk": "Personalized assistance for every aspect of your stay",
  "Airport Transfers": "Comfortable transfers arranged to and from all nearby airports",
  "Currency Exchange": "On-site currency exchange for international guests",
  "In-room Safe": "Secure digital safe in every room",
};

export function Amenities({ amenities }: AmenitiesProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-32 lg:py-40 px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-label text-gold text-xs mb-4">At Your Service</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-charcoal font-light">
            Amenities
          </h2>
        </motion.div>

        <div className="border-t border-gold/10">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity}
              className="border-b border-gold/10 py-4 cursor-default"
              data-cursor-hover
              onMouseEnter={() => setHovered(amenity)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-charcoal">
                  {amenity}
                </span>
                <motion.span
                  className="text-gold text-sm"
                  animate={{ rotate: hovered === amenity ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {hovered === amenity && amenityDescriptions[amenity] && (
                  <motion.p
                    className="text-warm/50 text-sm mt-2 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {amenityDescriptions[amenity]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
