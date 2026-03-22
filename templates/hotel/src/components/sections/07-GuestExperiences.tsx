"use client";

import { motion } from "framer-motion";
import type { Review } from "@/data/sample";

interface GuestExperiencesProps {
  reviews: Review[];
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm">
          &#9733;
        </span>
      ))}
    </div>
  );
}

export function GuestExperiences({ reviews }: GuestExperiencesProps) {
  const featured = reviews.slice(0, 5);

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Guest Experiences
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal">
            In their words
          </p>
        </motion.div>

        <div className="space-y-16">
          {featured.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="text-center"
            >
              <span className="font-serif text-5xl leading-none text-gold/40">
                &ldquo;
              </span>
              <p className="mx-auto mt-2 max-w-2xl font-serif text-lg font-light leading-relaxed text-charcoal md:text-xl">
                {review.text}
              </p>
              <div className="mt-6 flex flex-col items-center gap-2">
                <Stars count={review.rating} />
                <p className="font-serif text-sm italic text-charcoal">
                  {review.name}
                </p>
                <p className="text-xs text-charcoal-light">
                  {review.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
