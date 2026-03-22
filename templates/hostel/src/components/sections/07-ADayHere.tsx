"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/data/sample";

interface ADayHereProps {
  timeline: TimelineEvent[];
  city: string;
}

export function ADayHere({ timeline, city }: ADayHereProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          a day here
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          24 hours in {city}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-14 text-base"
        >
          A typical day at the hostel. No two are the same, but this is a good start.
        </motion.p>

        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-sand sm:left-[31px]" />

          <div className="space-y-8">
            {timeline.map((event, i) => (
              <motion.div
                key={event.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-5 sm:gap-6 group"
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream border-2 border-sand flex items-center justify-center text-2xl group-hover:border-terracotta transition-colors">
                    {event.icon}
                  </div>
                </div>

                <div className="pt-1 pb-2">
                  <p
                    className="text-terracotta text-sm font-medium tracking-wider uppercase mb-1"
                  >
                    {event.time}
                  </p>
                  <h3
                    className="text-xl sm:text-2xl mb-1"
                    style={{ fontFamily: "var(--font-caveat)" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
