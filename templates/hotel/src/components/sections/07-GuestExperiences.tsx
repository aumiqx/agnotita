"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Review } from "@/data/sample";

interface GuestExperiencesProps {
  reviews: Review[];
}

export function GuestExperiences({ reviews }: GuestExperiencesProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [next]);

  const review = reviews[current];

  return (
    <section
      ref={ref}
      className="bg-ivory"
      style={{ padding: "clamp(100px, 15vh, 200px) 24px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          className="font-serif text-gold text-[6rem] leading-none block mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          &ldquo;
        </motion.span>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-serif italic text-[clamp(1.2rem,2.5vw,1.8rem)] text-charcoal leading-relaxed mb-10 max-w-3xl mx-auto">
                {review.text}
              </p>

              <div className="gold-line mx-auto mb-6" />

              <p className="font-label text-warm text-xs">
                {review.name}
              </p>
              <p className="text-warm/50 text-xs mt-1">
                {review.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-px transition-all duration-700 ${
                i === current ? "bg-gold" : "bg-charcoal/15"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
