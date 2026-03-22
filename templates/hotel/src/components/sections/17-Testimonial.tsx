"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Review } from "@/data/sample";

interface TestimonialHighlightProps {
  review: Review;
}

export function TestimonialHighlight({ review }: TestimonialHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-linen"
      style={{ padding: "clamp(100px, 15vh, 200px) 24px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="flex justify-center gap-1 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-gold text-lg">
              &#9733;
            </span>
          ))}
        </motion.div>

        <motion.blockquote
          className="font-serif italic text-[clamp(1.3rem,3vw,2.2rem)] text-charcoal leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          &ldquo;{review.text}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="gold-line mx-auto mb-6" />
          <p className="font-label text-warm text-xs">
            {review.name}
          </p>
          <p className="text-warm/40 text-xs mt-1">{review.location}</p>
        </motion.div>
      </div>
    </section>
  );
}
