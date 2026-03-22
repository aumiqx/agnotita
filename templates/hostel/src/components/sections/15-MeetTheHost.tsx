"use client";

import { motion } from "framer-motion";

interface MeetTheHostProps {
  hostName: string;
  hostPhoto: string;
  hostQuote: string;
}

export function MeetTheHost({ hostName, hostPhoto, hostQuote }: MeetTheHostProps) {
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
          meet the host
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          The humans behind this
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <div className="relative">
              <img
                src={hostPhoto}
                alt={hostName}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg"
                loading="lazy"
              />
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-terracotta text-white px-4 py-1 rounded-sm text-sm whitespace-nowrap"
                style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
              >
                {hostName}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <svg
                className="absolute -top-6 -left-4 w-10 h-10 text-sand"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote
                className="text-xl sm:text-2xl text-charcoal leading-relaxed pl-6 border-l-2 border-terracotta"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {hostQuote}
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
