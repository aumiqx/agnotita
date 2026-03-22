"use client";

import { motion } from "framer-motion";
import type { HostelReview } from "@/data/sample";

interface HonestReviewProps {
  honestReviews: HostelReview[];
}

const hostelResponses: Record<number, string> = {
  0: "We hear you. We've upgraded our solar heater system and added a backup electric heater. Mornings should be toasty now.",
  1: "Fair point. We've installed solar path lights on the uphill stretch and added offline map QR codes at check-in. Wi-Fi upgrade is next on the list.",
  2: "Honestly, yes. We're a hostel, not a resort. But we promise the experience is worth it. Come with the right expectations and you won't be disappointed.",
};

export function HonestReview({ honestReviews }: HonestReviewProps) {
  return (
    <section className="py-24 sm:py-32 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Honest Review
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-2">
          We&apos;re not perfect
        </h2>
        <p className="font-handwritten text-2xl text-terracotta/60 mb-16">
          (yet)
        </p>

        <div className="space-y-8">
          {honestReviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Guest review */}
              <div className="bg-white rounded-sm p-6 sm:p-8 border-l-3 border-bark/40">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{review.flag}</span>
                  <div>
                    <span className="font-medium text-sm text-charcoal">
                      {review.author}
                    </span>
                    <span className="text-xs text-warm-gray ml-2">
                      {review.country}
                    </span>
                  </div>
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
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-serif text-base text-charcoal/70 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Hostel response */}
              {hostelResponses[i] && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  className="ml-8 sm:ml-12 mt-3 bg-terracotta/5 border-l-3 border-terracotta/30 rounded-sm p-5"
                >
                  <span className="font-mono text-[10px] tracking-wider text-terracotta uppercase block mb-2">
                    Our Response
                  </span>
                  <p className="font-serif text-sm text-charcoal/70 leading-relaxed">
                    {hostelResponses[i]}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
