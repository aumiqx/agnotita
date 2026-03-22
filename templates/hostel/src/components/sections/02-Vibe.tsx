"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface VibeProps {
  vibeWords: string[];
}

const EXTENDED_WORDS = [
  "chill",
  "community",
  "river views",
  "rooftop yoga",
  "midnight chai",
  "bonfires",
  "guitar jams",
  "sunrise",
];

export function Vibe({ vibeWords }: VibeProps) {
  const words = vibeWords.length > 3 ? vibeWords : EXTENDED_WORDS;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-40%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-32 overflow-hidden bg-cream"
    >
      <motion.div
        className="absolute inset-0 bg-terracotta"
        style={{ opacity: bgOpacity }}
      />

      {/* Row 1 -- ghost, moves left */}
      <motion.div
        className="flex items-center gap-6 sm:gap-12 whitespace-nowrap mb-4 sm:mb-6"
        style={{ x: x1 }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={`r1-${i}`}
            className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-charcoal/10 select-none"
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Row 2 -- main visible row, moves right */}
      <motion.div
        className="flex items-center gap-6 sm:gap-12 whitespace-nowrap mb-4 sm:mb-6"
        style={{ x: x2 }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={`r2-${i}`}
            className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] select-none"
            style={{
              color:
                i % 3 === 0
                  ? "var(--color-terracotta)"
                  : "var(--color-charcoal)",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Row 3 -- ghost, moves left */}
      <motion.div
        className="flex items-center gap-6 sm:gap-12 whitespace-nowrap"
        style={{ x: x1 }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={`r3-${i}`}
            className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-charcoal/10 select-none"
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-2 h-2 rounded-full bg-terracotta" />
      </div>
    </section>
  );
}
