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
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Ken Burns zoom background */}
      <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center photo-cursor"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Passport stamp badge */}
        <motion.div
          initial={{ opacity: 0, scale: 2, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mb-8 border-3 border-dashed border-terracotta/80 rounded px-5 py-2.5 backdrop-blur-sm bg-black/10"
        >
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="text-terracotta font-bold text-sm">{rating}</span>
            <span className="w-px h-3 bg-white/40" />
            <span className="text-white/70">{reviewCount} reviews</span>
          </div>
        </motion.div>

        {/* Massive handwritten name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-handwritten leading-[0.85] mb-4 mix-blend-difference"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
          }}
        >
          {name}
        </motion.h1>

        {/* City + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-serif text-xl sm:text-2xl tracking-[0.3em] uppercase text-white/80">
            {city}
          </p>
          <div className="w-16 h-px bg-terracotta/60" />
          <p className="font-handwritten text-xl text-white/50 italic">
            {tagline}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll prompt — handwritten */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-handwritten text-white/50 text-lg">
          scroll to explore
        </span>
        <motion.span
          className="text-white/40 text-2xl"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          &#8595;
        </motion.span>
      </motion.div>
    </section>
  );
}
