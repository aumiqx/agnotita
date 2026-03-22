"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { EventSpace } from "@/data/sample";

interface EventsProps {
  events: {
    available: boolean;
    description: string;
    image: string;
    spaces: EventSpace[];
  };
}

export function Events({ events }: EventsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  if (!events.available) return null;

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${events.image})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center"
      >
        <motion.h2
          className="font-serif text-white text-[clamp(2rem,4vw,3rem)] font-light italic mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Host Your Moment Here
        </motion.h2>

        <motion.div
          className="flex gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {events.spaces.map((space) => (
            <div key={space.name} className="text-center">
              <p className="font-serif text-white/80 text-sm">{space.name}</p>
              <p className="font-label text-gold-light text-xs mt-1">
                {space.capacity}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-white/50 text-sm max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {events.description}
        </motion.p>
      </div>
    </section>
  );
}
