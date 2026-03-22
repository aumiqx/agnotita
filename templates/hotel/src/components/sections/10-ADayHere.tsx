"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { DayItinerary } from "@/data/sample";

interface ADayHereProps {
  itinerary: DayItinerary[];
  name: string;
}

function TimelineItem({ item, index }: { item: DayItinerary; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[100px_1px_1fr] lg:grid-cols-[140px_1px_1fr] gap-6 lg:gap-10 items-start"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08 }}
    >
      <div className="text-right">
        <motion.p
          className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-gold"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.time}
        </motion.p>
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-2 h-2 rounded-full border border-gold bg-ivory flex-shrink-0 mt-3"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
        />
        <motion.div
          className="w-px bg-gold/20 flex-1 min-h-[60px]"
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.08 }}
        />
      </div>

      <motion.div
        className="pb-12"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <h4 className="font-serif text-lg text-charcoal mb-2">{item.title}</h4>
        <p className="text-warm/60 text-sm leading-relaxed max-w-md">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ADayHere({ itinerary, name }: ADayHereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-ivory py-32 lg:py-40 px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-label text-gold text-xs mb-4">A Day At</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-charcoal font-light">
            {name}
          </h2>
        </motion.div>

        <div>
          {itinerary.map((item, i) => (
            <TimelineItem key={item.time} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
