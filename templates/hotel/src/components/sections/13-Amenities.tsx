"use client";

import { motion } from "framer-motion";

interface AmenitiesProps {
  amenities: string[];
}

function AmenityIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    "Free WiFi": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    "Infinity Pool": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M2 16c2-2 4 2 6 0s4-2 6 0 4 2 6 0" />
        <path d="M2 20c2-2 4 2 6 0s4-2 6 0 4 2 6 0" />
      </svg>
    ),
    "Room Service": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M4 18h16" />
        <path d="M4 18c0-6 3.5-10 8-10s8 4 8 10" />
        <path d="M12 4v4" />
      </svg>
    ),
  };

  const defaultIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    </svg>
  );

  return iconMap[name] || defaultIcon;
}

export function Amenities({ amenities }: AmenitiesProps) {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Amenities
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal">
            Everything you need
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.04,
              }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="text-gold">
                <AmenityIcon name={amenity} />
              </div>
              <span className="text-xs tracking-wider text-charcoal">
                {amenity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
