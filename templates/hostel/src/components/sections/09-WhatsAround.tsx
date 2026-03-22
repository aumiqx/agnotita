"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { NearbyPlace } from "@/data/sample";

interface WhatsAroundProps {
  nearbyPlaces: NearbyPlace[];
  hostelName: string;
}

const typeColors: Record<string, string> = {
  landmark: "#C17B5E",
  historical: "#5C4033",
  cafe: "#8B8178",
  temple: "#3D6B4F",
  adventure: "#C0392B",
  nature: "#27AE60",
};

const typeLabels: Record<string, string> = {
  landmark: "Landmark",
  historical: "Historical",
  cafe: "Cafe",
  temple: "Temple",
  adventure: "Adventure",
  nature: "Nature",
};

export function WhatsAround({ nearbyPlaces, hostelName }: WhatsAroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const maxDistance = 5.5;
  const containerSize = 520;
  const center = containerSize / 2;

  function getPosition(place: NearbyPlace) {
    const normalizedDist = place.distanceKm / maxDistance;
    const radius = normalizedDist * (containerSize / 2 - 40);
    const angleRad = (place.angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  }

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-parchment overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          What&apos;s Around
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-4">
          Your neighbourhood
        </h2>
        <p className="font-serif text-lg text-warm-gray mb-16 max-w-lg">
          Everything within walking or riding distance.
        </p>

        {/* Desktop: hand-drawn style map */}
        <div className="hidden md:block">
          <motion.div
            className="relative mx-auto"
            style={{ width: containerSize, height: containerSize, y: mapY }}
          >
            {/* Concentric distance rings */}
            {[1, 2, 3, 5].map((km) => {
              const r = (km / maxDistance) * (containerSize / 2 - 40);
              return (
                <motion.div
                  key={km}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: km * 0.1 }}
                  className="absolute border border-dashed rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    left: center - r,
                    top: center - r,
                    borderColor: "var(--color-sand)",
                  }}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-warm-gray/40 bg-parchment px-1">
                    {km}km
                  </span>
                </motion.div>
              );
            })}

            {/* Center hostel dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute z-20"
              style={{ left: center - 20, top: center - 20 }}
            >
              <div className="w-10 h-10 rounded-full bg-terracotta shadow-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">H</span>
              </div>
              <span className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-handwritten text-sm text-charcoal">
                {hostelName}
              </span>
            </motion.div>

            {/* Place dots */}
            {nearbyPlaces.map((place, i) => {
              const pos = getPosition(place);
              const color = typeColors[place.type] ?? "#8B8178";
              const isHovered = hoveredPlace === place.name;

              return (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="absolute z-10 group"
                  style={{ left: pos.x - 6, top: pos.y - 6 }}
                  onMouseEnter={() => setHoveredPlace(place.name)}
                  onMouseLeave={() => setHoveredPlace(null)}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full cursor-pointer"
                    style={{ backgroundColor: color }}
                    animate={isHovered ? { scale: 2 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  {/* Tooltip */}
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={
                      isHovered
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 5 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-charcoal text-white text-xs px-3 py-2 rounded whitespace-nowrap shadow-xl">
                      <span className="font-medium">{place.name}</span>
                      <span className="text-white/50 ml-2">
                        {place.distance}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Legend */}
          <div className="flex justify-center gap-5 mt-8 flex-wrap">
            {Object.entries(typeLabels).map(([type, label]) => (
              <div
                key={type}
                className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-warm-gray"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: typeColors[type] }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: sorted list */}
        <div className="md:hidden space-y-3">
          {[...nearbyPlaces]
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex items-center gap-4 bg-white rounded-sm p-4"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: typeColors[place.type] ?? "#8B8178",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">
                    {place.name}
                  </p>
                  <p className="font-mono text-[10px] text-warm-gray capitalize">
                    {place.type}
                  </p>
                </div>
                <span className="font-mono text-xs text-terracotta shrink-0">
                  {place.distance}
                </span>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
