"use client";

import { motion } from "framer-motion";
import type { HostelReview } from "@/data/sample";

interface TravelerStoriesProps {
  reviews: HostelReview[];
}

export function TravelerStories({ reviews }: TravelerStoriesProps) {
  const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.8, -0.5, 2.2];

  return (
    <section className="py-20 sm:py-28 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          traveler stories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Postcards from guests
        </motion.h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotations[i % rotations.length],
              }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="postcard break-inside-avoid p-5 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{review.flag}</span>
                <div>
                  <p className="font-medium text-charcoal text-sm">
                    {review.author}
                  </p>
                  <p className="text-xs text-warm-gray">{review.country}</p>
                </div>
                <div className="ml-auto text-terracotta text-sm tracking-wider">
                  {"*".repeat(review.rating)}
                </div>
              </div>

              <p
                className="text-warm-gray text-sm leading-relaxed italic"
                style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-3 pt-3 border-t border-sand">
                <p className="text-xs text-warm-gray/60">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
