"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { Restaurant } from "@/data/sample";

interface DiningProps {
  restaurant: Restaurant;
}

export function Dining({ restaurant }: DiningProps) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-32 text-center"
      >
        <motion.p
          className="font-label text-gold-light text-xs mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {restaurant.hours}
        </motion.p>

        <motion.h2
          className="font-serif text-white text-[clamp(2.5rem,5vw,4rem)] font-light mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {restaurant.name}
        </motion.h2>

        <motion.p
          className="font-serif text-white/80 italic text-xl mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {restaurant.cuisine}
        </motion.p>

        <motion.p
          className="text-white/60 text-base max-w-xl leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {restaurant.description}
        </motion.p>

        <motion.a
          href="#reserve"
          className="text-gold font-serif text-lg italic relative group"
          data-cursor-hover
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Reserve a Table
          <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </motion.a>
      </div>
    </section>
  );
}
