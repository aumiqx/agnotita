"use client";

import { motion } from "framer-motion";
import type { NearbyAttraction } from "@/data/sample";

interface SurroundingsProps {
  attractions: NearbyAttraction[];
  city: string;
}

function CategoryIcon({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Landmark: "bg-gold/10 text-gold",
    Culture: "bg-charcoal/5 text-charcoal",
    Spiritual: "bg-gold/10 text-gold-dark",
    Nature: "bg-green-50 text-green-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-medium tracking-wider uppercase ${
        colors[category] || colors.Landmark
      }`}
    >
      {category}
    </span>
  );
}

export function Surroundings({ attractions, city }: SurroundingsProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            The Surroundings
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
            Discover {city}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attractions.map((attraction, i) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="border border-warm-gray-dark p-8 transition-colors duration-500 hover:border-gold/40"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-xl font-light text-charcoal">
                  {attraction.name}
                </h3>
                <CategoryIcon category={attraction.category} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
                {attraction.description}
              </p>
              <p className="mt-4 text-xs tracking-wider text-gold">
                {attraction.distance}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
