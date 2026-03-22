"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TheDriftProps {
  driftImage: string;
}

export function TheDrift({ driftImage }: TheDriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${driftImage})`,
            top: "-10%",
            bottom: "-10%",
            height: "120%",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream pointer-events-none" />
    </section>
  );
}
