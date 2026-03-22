"use client";

import { motion } from "framer-motion";

interface VibeProps {
  vibeWords: string[];
}

export function Vibe({ vibeWords }: VibeProps) {
  return (
    <section className="py-32 sm:py-40 px-6 bg-cream">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-8"
        >
          the vibe
        </motion.p>

        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
          {vibeWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal font-light tracking-wide"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {word}
              {i < vibeWords.length - 1 && (
                <span className="ml-4 sm:ml-6 md:ml-8 text-terracotta select-none">&middot;</span>
              )}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 h-px bg-sand max-w-xs mx-auto"
        />
      </div>
    </section>
  );
}
