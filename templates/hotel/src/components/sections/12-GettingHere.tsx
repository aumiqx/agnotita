"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { TransportOption } from "@/data/sample";

interface GettingHereProps {
  options: TransportOption[];
  name: string;
  mapEmbedUrl: string;
}

export function GettingHere({ options, name, mapEmbedUrl }: GettingHereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-ivory py-32 lg:py-40 px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-label text-gold text-xs mb-4">Arrive</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-charcoal font-light mb-16">
            Getting Here
          </h2>
        </motion.div>

        <div className="space-y-8">
          {options.map((option, i) => (
            <motion.div
              key={option.from}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-charcoal">
                From {option.from}
                <span className="text-gold mx-3">:</span>
                {option.duration}
                <span className="text-warm/40 text-sm ml-3">by {option.mode.toLowerCase()}</span>
              </p>
              {i < options.length - 1 && (
                <div className="gold-line mx-auto mt-8" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 overflow-hidden rounded-sm"
          style={{ height: "300px" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Directions to ${name}`}
            style={{ filter: "grayscale(0.5) sepia(0.1) contrast(1.1)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
