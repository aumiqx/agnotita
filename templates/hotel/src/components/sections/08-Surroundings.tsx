"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { NearbyAttraction } from "@/data/sample";

interface SurroundingsProps {
  attractions: NearbyAttraction[];
  city: string;
  mapEmbedUrl: string;
}

export function Surroundings({ attractions, city, mapEmbedUrl }: SurroundingsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-32 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="relative bg-linen overflow-hidden h-[50vh] lg:h-auto">
          <iframe
            src={mapEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${city}`}
            style={{ filter: "grayscale(0.6) contrast(1.1) sepia(0.15)" }}
          />
        </div>

        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="font-label text-gold text-xs mb-4">Discover</p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-charcoal font-light mb-12">
              The Surroundings
            </h2>
          </motion.div>

          <div className="space-y-0">
            {attractions.map((place, i) => (
              <motion.div
                key={place.name}
                className="py-5 border-b border-gold/10"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg text-charcoal mb-1">
                      {place.name}
                    </h4>
                    <p className="text-warm/60 text-sm leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                  <span className="font-label text-gold text-xs whitespace-nowrap mt-1">
                    {place.distance}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
