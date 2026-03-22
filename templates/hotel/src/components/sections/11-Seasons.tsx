"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Season } from "@/data/sample";

interface SeasonsProps {
  seasons: Season[];
  city: string;
  gallery: string[];
}

const seasonColors: Record<string, string> = {
  Spring: "rgba(180, 200, 140, 0.15)",
  Monsoon: "rgba(100, 160, 180, 0.15)",
  Autumn: "rgba(200, 160, 100, 0.15)",
  Winter: "rgba(180, 200, 220, 0.15)",
};

export function Seasons({ seasons, city, gallery }: SeasonsProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <motion.div
        className="text-center px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-label text-gold text-xs mb-4">{city}</p>
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-charcoal font-light">
          Through the Seasons
        </h2>
      </motion.div>

      <div className="flex flex-col">
        {seasons.map((season, i) => {
          const isExpanded = expanded === i;
          const image = gallery[i % gallery.length];
          return (
            <motion.div
              key={season.name}
              className="relative overflow-hidden cursor-pointer"
              style={{
                backgroundColor: seasonColors[season.name] || "rgba(0,0,0,0.03)",
              }}
              data-cursor-hover
              onClick={() => setExpanded(isExpanded ? null : i)}
              animate={{ height: isExpanded ? "60vh" : "15vh" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {isExpanded && (
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ duration: 0.6 }}
                />
              )}

              <div className="relative z-10 flex items-center h-full px-8 lg:px-20">
                <div className="flex-1">
                  <div className="flex items-baseline gap-6">
                    <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-charcoal font-light">
                      {season.name}
                    </h3>
                    <span className="font-label text-warm/40 text-xs">
                      {season.months}
                    </span>
                    <span className="text-warm/30 text-xs">{season.temperature}</span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 max-w-xl"
                      >
                        <p className="text-warm text-sm leading-relaxed mb-4">
                          {season.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {season.highlights.map((h) => (
                            <span
                              key={h}
                              className="text-gold/80 text-xs px-3 py-1 border border-gold/15 rounded-full"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.span
                  className="text-gold text-xl font-light"
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  +
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
