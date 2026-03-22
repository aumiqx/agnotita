"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WelcomeProps {
  tagline: string;
  message: string;
}

export function Welcome({ tagline, message }: WelcomeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-white"
      style={{ padding: "clamp(120px, 20vh, 240px) 24px" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light italic leading-snug text-charcoal"
          style={{ letterSpacing: "0.02em" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {tagline}
        </motion.p>

        <motion.div
          className="mx-auto my-12 gold-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="text-warm leading-relaxed text-base max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {message}
        </motion.p>
      </div>

      <div className="gold-line-full mt-32 max-w-6xl mx-auto" />
    </section>
  );
}
