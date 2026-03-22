"use client";

import { motion } from "framer-motion";
import type { NearbyPlace } from "@/data/sample";

interface WhatsAroundProps {
  nearbyPlaces: NearbyPlace[];
  hostelName: string;
}

const typeColors: Record<string, string> = {
  landmark: "#D4A574",
  historical: "#8B7355",
  cafe: "#B8895A",
  temple: "#2D5016",
  adventure: "#C0392B",
  nature: "#27AE60",
};

const typeIcons: Record<string, string> = {
  landmark: "\uD83C\uDF09",
  historical: "\uD83C\uDFDB\uFE0F",
  cafe: "\u2615",
  temple: "\uD83D\uDED5",
  adventure: "\uD83C\uDFC4",
  nature: "\uD83C\uDF3F",
};

export function WhatsAround({ nearbyPlaces, hostelName }: WhatsAroundProps) {
  const maxDistance = 5;
  const containerSize = 500;
  const center = containerSize / 2;

  function getPosition(place: NearbyPlace) {
    const radius = (place.distanceKm / maxDistance) * (containerSize / 2 - 30);
    const angleRad = (place.angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  }

  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          what&apos;s around
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Your neighbourhood
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-12 text-base"
        >
          Everything within walking or riding distance.
        </motion.p>

        {/* Desktop: interactive radius map */}
        <div className="hidden md:block">
          <div className="relative mx-auto" style={{ width: containerSize, height: containerSize }}>
            {/* Concentric circles */}
            {[1, 3, 5].map((km) => {
              const r = (km / maxDistance) * (containerSize / 2 - 30);
              return (
                <motion.div
                  key={km}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: km * 0.15 }}
                  viewport={{ once: true }}
                  className="absolute border border-dashed border-sand rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    left: center - r,
                    top: center - r,
                  }}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-warm-gray/50 bg-white px-1">
                    {km}km
                  </span>
                </motion.div>
              );
            })}

            {/* Center dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              viewport={{ once: true }}
              className="absolute w-4 h-4 bg-terracotta rounded-full shadow-md z-10"
              style={{ left: center - 8, top: center - 8 }}
            >
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-charcoal"
              >
                {hostelName}
              </span>
            </motion.div>

            {/* Place dots */}
            {nearbyPlaces.map((place, i) => {
              const pos = getPosition(place);
              const color = typeColors[place.type] ?? "#6B6560";
              return (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                  viewport={{ once: true }}
                  className="absolute group z-10"
                  style={{ left: pos.x - 6, top: pos.y - 6 }}
                >
                  <div
                    className="w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-charcoal text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {typeIcons[place.type] ?? ""} {place.name}
                      <span className="text-white/60 ml-1">({place.distance})</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {Object.entries(typeIcons).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-1.5 text-xs text-warm-gray">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: typeColors[type] }}
                />
                <span>{icon} {type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: list view */}
        <div className="md:hidden space-y-3">
          {nearbyPlaces
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-cream rounded-sm p-3"
              >
                <span className="text-lg">{typeIcons[place.type] ?? "\uD83D\uDCCD"}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{place.name}</p>
                  <p className="text-xs text-warm-gray capitalize">{place.type}</p>
                </div>
                <span className="text-xs text-terracotta font-medium">{place.distance}</span>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
