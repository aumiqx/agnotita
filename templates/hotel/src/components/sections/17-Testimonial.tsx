"use client";

import { motion } from "framer-motion";
import type { Review } from "@/data/sample";

interface TestimonialHighlightProps {
  review: Review;
}

export function TestimonialHighlight({ review }: TestimonialHighlightProps) {
  return (
    <section className="bg-linen py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i} className="text-gold text-xl">
                &#9733;
              </span>
            ))}
          </div>

          <span className="mt-6 block font-serif text-7xl leading-none text-gold/30 md:text-8xl">
            &ldquo;
          </span>

          <p className="mt-4 font-serif text-2xl font-light leading-relaxed text-charcoal md:text-3xl">
            {review.text}
          </p>

          <div className="mx-auto mt-10 h-px w-16 bg-gold" />

          <p className="mt-6 font-serif text-base italic text-charcoal">
            {review.name}
          </p>
          <p className="mt-1 text-xs tracking-wider text-charcoal-light">
            {review.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
