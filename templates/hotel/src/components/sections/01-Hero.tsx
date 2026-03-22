"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  name: string;
  city: string;
  heroImage: string;
}

export function Hero({ name, city, heroImage }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns 20s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6"
        style={{ opacity, y: textY }}
      >
        <motion.h1
          className="font-serif text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[0.12em] text-center leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="font-label mt-6 text-white/70 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          {city.toUpperCase()}
        </motion.p>

        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div
            className="w-px h-12 bg-white/40"
            style={{ animation: "float-line 2.5s ease-in-out infinite" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
