"use client";

import { motion } from "framer-motion";
import type { DayItinerary } from "@/data/sample";

interface ADayHereProps {
  itinerary: DayItinerary[];
  name: string;
}

function PeriodBadge({ period }: { period: DayItinerary["period"] }) {
  const styles: Record<string, string> = {
    morning: "bg-gold/10 text-gold-dark",
    afternoon: "bg-ivory text-charcoal",
    evening: "bg-charcoal/5 text-charcoal-light",
  };

  return (
    <span
      className={`rounded-full px-3 py-0.5 text-[10px] font-medium tracking-wider uppercase ${styles[period]}`}
    >
      {period}
    </span>
  );
}

export function ADayHere({ itinerary, name }: ADayHereProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            A Day at {name}
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal">
            A curated rhythm
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gold/20 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {itinerary.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.05,
                }}
                className="relative pl-16 md:pl-0"
              >
                <div
                  className={`md:flex md:items-start md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="font-serif text-lg text-gold">
                      {item.time}
                    </span>
                  </div>

                  <div className="absolute left-4 top-1 h-3 w-3 rounded-full border-2 border-gold bg-white md:static md:mx-0 md:shrink-0" />

                  <div
                    className={`mt-1 md:mt-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        i % 2 === 0
                          ? "md:justify-start"
                          : "md:flex-row-reverse md:justify-start"
                      }`}
                    >
                      <h3 className="font-serif text-lg font-light text-charcoal">
                        {item.title}
                      </h3>
                      <PeriodBadge period={item.period} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
