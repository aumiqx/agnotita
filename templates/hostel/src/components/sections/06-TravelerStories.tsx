"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import type { HostelReview } from "@/data/sample";

interface TravelerStoriesProps {
  reviews: HostelReview[];
}

export function TravelerStories({ reviews }: TravelerStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [isPaused, advance]);

  const active = reviews[activeIndex];
  const prevReviews = reviews
    .slice(0, activeIndex)
    .reverse()
    .slice(0, 3);

  return (
    <section
      className="py-24 sm:py-32 px-6 bg-parchment overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Traveler Stories
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-16">
          Postcards from guests
        </h2>

        {/* Main active quote */}
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Big quote mark */}
              <span className="font-serif text-[8rem] sm:text-[10rem] leading-none text-terracotta/10 absolute -top-10 -left-4 select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.5] text-charcoal/90 max-w-3xl mb-8">
                {active.text}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-2xl">
                  {active.flag}
                </div>
                <div>
                  <p className="font-handwritten text-xl text-charcoal">
                    {active.author}
                  </p>
                  <p className="font-mono text-xs text-warm-gray tracking-wider">
                    {active.country} &middot;{" "}
                    {new Date(active.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < active.rating ? "text-terracotta" : "text-sand"}`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Previous quotes stacked below, shrinking */}
        {prevReviews.length > 0 && (
          <div className="mt-12 space-y-3">
            {prevReviews.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 0.4 - i * 0.1,
                  y: 0,
                  scale: 1 - i * 0.03,
                }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-l-2 border-sand pl-6 py-2 cursor-pointer hover:opacity-60 transition-opacity"
                onClick={() =>
                  setActiveIndex(reviews.indexOf(review))
                }
              >
                <p className="font-serif text-sm text-charcoal/50 line-clamp-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-mono text-xs text-warm-gray/40 mt-1">
                  {review.author} &middot; {review.country}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Navigation dots */}
        <div className="flex items-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-terracotta"
                  : "w-1.5 bg-sand hover:bg-warm-gray"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
