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

  // Three parallax layers at different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]); // foreground (plants/railing)
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]); // midground (buildings/river)
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]); // background (mountains)

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden"
    >
      {/* Background layer (deepest, slowest) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y3, scale }}
      >
        <div
          className="absolute bg-cover bg-center photo-cursor"
          style={{
            backgroundImage: `url(${driftImage})`,
            inset: "-15%",
            width: "130%",
            height: "130%",
          }}
        />
      </motion.div>

      {/* Midground subtle overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/5 to-transparent"
        style={{ y: y2 }}
      />

      {/* Foreground vignette */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-transparent to-cream/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-cream/30" />
      </motion.div>

      {/* Grain overlay for texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </section>
  );
}
