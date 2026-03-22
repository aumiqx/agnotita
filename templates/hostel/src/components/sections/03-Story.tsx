"use client";

import { motion } from "framer-motion";

interface StoryProps {
  longDescription: string;
  photos: { url: string; caption?: string }[];
}

export function Story({ longDescription, photos }: StoryProps) {
  const paragraphs = longDescription.split("\n\n");
  const storyPhoto = photos[1]?.url ?? photos[0]?.url;

  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          our story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          How it all started
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-3 space-y-6">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-warm-gray leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24">
              <div className="relative">
                <img
                  src={storyPhoto}
                  alt="Life at the hostel"
                  className="w-full rounded-sm shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-terracotta text-white px-4 py-2 text-sm tracking-wide rounded-sm">
                  est. 2019
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
