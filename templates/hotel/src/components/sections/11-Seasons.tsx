"use client";

import { motion } from "framer-motion";
import type { Season } from "@/data/sample";

interface SeasonsProps {
  seasons: Season[];
  city: string;
}

export function Seasons({ seasons, city }: SeasonsProps) {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            When to Visit
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
            {city} through the seasons
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {seasons.map((season, i) => (
            <motion.div
              key={season.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="border border-warm-gray-dark bg-white p-8 transition-colors duration-500 hover:border-gold/40"
            >
              <h3 className="font-serif text-2xl font-light text-charcoal">
                {season.name}
              </h3>
              <p className="mt-1 text-xs tracking-wider text-gold">
                {season.months}
              </p>
              <p className="mt-1 text-xs text-charcoal-light">
                {season.temperature}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-charcoal-light">
                {season.description}
              </p>

              <ul className="mt-5 space-y-2">
                {season.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-xs text-charcoal-light"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
