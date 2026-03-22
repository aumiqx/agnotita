"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/data/sample";

interface DiningProps {
  restaurant: Restaurant;
}

export function Dining({ restaurant }: DiningProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2"
          >
            <div className="overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-80 w-full object-cover md:h-[550px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Dining
            </h2>
            <h3 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
              {restaurant.name}
            </h3>
            <p className="mt-2 text-xs tracking-wider text-charcoal-light uppercase">
              {restaurant.cuisine} &middot; {restaurant.hours}
            </p>

            <p className="mt-8 text-sm leading-relaxed text-charcoal-light">
              {restaurant.description}
            </p>

            <div className="mt-10">
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-charcoal">
                Signature Dishes
              </h4>
              <ul className="mt-4 space-y-3">
                {restaurant.signatureDishes.map((dish) => (
                  <li
                    key={dish}
                    className="flex items-center gap-3 text-sm text-charcoal-light"
                  >
                    <span className="h-px w-4 bg-gold" />
                    {dish}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#reserve"
              className="mt-10 inline-block border border-charcoal px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase text-charcoal transition-all duration-500 hover:border-gold hover:bg-gold hover:text-white"
            >
              Reserve a Table
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
