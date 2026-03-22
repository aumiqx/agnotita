"use client";

import { motion } from "framer-motion";
import type { HouseRule } from "@/data/sample";

interface HouseRulesProps {
  houseRules: HouseRule[];
}

export function HouseRules({ houseRules }: HouseRulesProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          house rules
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          The non-negotiables
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-12 text-base"
        >
          Not many, but we mean them.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {houseRules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-cream rounded-sm p-4 sm:p-5 group hover:bg-sand/30 transition-colors"
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {rule.icon}
              </span>
              <p className="text-warm-gray text-sm sm:text-base leading-relaxed">
                {rule.rule}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
