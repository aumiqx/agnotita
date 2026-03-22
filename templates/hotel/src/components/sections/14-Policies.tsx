"use client";

import { motion } from "framer-motion";
import type { Policy } from "@/data/sample";

interface PoliciesProps {
  policies: Policy[];
}

export function Policies({ policies }: PoliciesProps) {
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
            Hotel Policies
          </h2>
        </motion.div>

        <div className="space-y-8">
          {policies.map((policy, i) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="border-b border-warm-gray-dark pb-6"
            >
              <h3 className="font-serif text-lg font-light text-charcoal">
                {policy.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
                {policy.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
