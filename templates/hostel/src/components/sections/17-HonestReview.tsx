"use client";

import { motion } from "framer-motion";
import type { HostelReview } from "@/data/sample";

interface HonestReviewProps {
  honestReviews: HostelReview[];
}

export function HonestReview({ honestReviews }: HonestReviewProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          honest review
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          We&apos;re not perfect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-12 text-base max-w-lg"
        >
          Transparency matters to us. Here are some things guests wish were
          better. We&apos;re working on it.
        </motion.p>

        <div className="space-y-5">
          {honestReviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="bg-white rounded-sm p-5 sm:p-6 border-l-3 border-bark"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{review.flag}</span>
                <span className="text-sm font-medium text-charcoal">
                  {review.author}
                </span>
                <span className="text-xs text-warm-gray">
                  &middot; {review.country}
                </span>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`text-xs ${
                        starIndex < review.rating
                          ? "text-terracotta"
                          : "text-sand"
                      }`}
                    >
                      {"\u2605"}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-warm-gray text-sm sm:text-base leading-relaxed">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
