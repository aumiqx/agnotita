"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { TimelineEvent } from "@/data/sample";

interface ADayHereProps {
  timeline: TimelineEvent[];
  city: string;
}

export function ADayHere({ timeline, city }: ADayHereProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          A Day Here
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-4">
          24 hours in {city}
        </h2>
        <p className="font-serif text-lg text-warm-gray mb-16 max-w-lg">
          No two days are the same, but this is a good place to start.
        </p>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-sand" />

          <div className="space-y-1">
            {timeline.map((event, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <motion.div
                  key={event.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <button
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : i)
                    }
                    className="w-full text-left flex items-start gap-5 sm:gap-8 py-4 group"
                  >
                    {/* Timeline dot */}
                    <div className="relative shrink-0 z-10">
                      <motion.div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-colors duration-300 ${
                          isExpanded
                            ? "bg-terracotta text-white shadow-lg"
                            : "bg-cream border-2 border-sand group-hover:border-terracotta"
                        }`}
                        animate={
                          isExpanded
                            ? { scale: [1, 1.1, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          isExpanded
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : {}
                        }
                      >
                        {event.icon}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs tracking-wider text-terracotta uppercase shrink-0">
                          {event.time}
                        </span>
                        {!isExpanded && (
                          <span className="font-handwritten text-lg text-charcoal/70 truncate">
                            {event.title}
                          </span>
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 pb-4">
                              <h3 className="font-handwritten text-3xl sm:text-4xl text-charcoal mb-3">
                                {event.title}
                              </h3>
                              <p className="font-serif text-base text-warm-gray leading-relaxed max-w-md">
                                {event.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
