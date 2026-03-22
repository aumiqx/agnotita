"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  tagline: string;
  bookingUrl: string;
}

export function Hero({
  name,
  city,
  rating,
  reviewCount,
  heroImage,
  tagline,
  bookingUrl,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 inline-block border-3 border-dashed border-terracotta rounded px-4 py-2"
        >
          <div className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase">
            <span className="text-terracotta">{"*".repeat(Math.floor(rating))}</span>
            <span>{rating}</span>
            <span className="text-white/70">/ {reviewCount} reviews</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-handwritten text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/80 tracking-widest uppercase mb-2"
        >
          {city}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/60 text-sm tracking-widest lowercase italic mb-10"
        >
          {tagline}
        </motion.p>

        <motion.a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-terracotta hover:bg-terracotta-dark text-white px-8 py-4 text-lg font-medium tracking-wide rounded-sm transition-colors"
        >
          Book Your Bed
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="opacity-60"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
