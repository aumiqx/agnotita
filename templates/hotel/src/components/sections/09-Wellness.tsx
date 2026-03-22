"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { SpaService } from "@/data/sample";

interface WellnessProps {
  spa: {
    available: boolean;
    description: string;
    image: string;
    services: SpaService[];
  };
}

export function Wellness({ spa }: WellnessProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  if (!spa.available) return null;

  const positions = [
    { top: "15%", left: "8%"  },
    { top: "25%", right: "6%" },
    { bottom: "30%", left: "5%"  },
    { bottom: "15%", right: "8%" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${spa.image})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-32"
      >
        <motion.h2
          className="font-serif text-white text-[clamp(2rem,4vw,3.5rem)] font-light mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Wellness
        </motion.h2>

        <motion.p
          className="text-white/60 text-center text-base max-w-xl mb-16 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {spa.description}
        </motion.p>

        <div className="hidden lg:block absolute inset-0 z-20">
          {spa.services.map((service, i) => {
            const pos = positions[i % positions.length];
            return (
              <motion.div
                key={service.name}
                className="absolute backdrop-blur-md bg-white/10 border border-white/15 rounded-sm p-5 max-w-[220px]"
                style={pos}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="font-serif text-white text-sm mb-1">{service.name}</p>
                <p className="text-white/40 text-xs">{service.duration}</p>
                <p className="text-gold text-sm mt-2 font-serif">
                  {"\u20B9"}{service.price.toLocaleString("en-IN")}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          {spa.services.map((service, i) => (
            <motion.div
              key={service.name}
              className="backdrop-blur-md bg-white/10 border border-white/15 rounded-sm p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-serif text-white text-sm mb-1">{service.name}</p>
              <p className="text-white/40 text-xs">{service.duration}</p>
              <p className="text-gold text-sm mt-2 font-serif">
                {"\u20B9"}{service.price.toLocaleString("en-IN")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
