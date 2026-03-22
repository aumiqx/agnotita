"use client";

import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  tagline: string;
  city: string;
  state: string;
  stars: number;
  heroImage: string;
  bookingUrl: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.3 + i * 0.15,
    },
  }),
};

export function Hero({
  name,
  tagline,
  city,
  state,
  stars,
  heroImage,
  bookingUrl,
}: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.08],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src={heroImage}
          alt={name}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-6 text-center text-white">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4 flex items-center gap-1"
        >
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} className="text-gold text-lg">
              &#9733;
            </span>
          ))}
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-5xl font-light tracking-wide md:text-7xl lg:text-8xl"
        >
          {name}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-3 text-sm font-light tracking-[0.3em] uppercase text-white/80"
        >
          {city}, {state}
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-lg font-serif text-lg font-light italic text-white/70 md:text-xl"
        >
          {tagline}
        </motion.p>

        <motion.a
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 border border-white/40 px-10 py-3.5 text-xs font-medium tracking-[0.25em] uppercase text-white transition-all duration-500 hover:border-gold hover:bg-gold hover:text-white"
        >
          Reserve Your Stay
        </motion.a>
      </div>
    </section>
  );
}
