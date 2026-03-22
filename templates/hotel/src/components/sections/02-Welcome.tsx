"use client";

import { motion } from "framer-motion";

interface WelcomeProps {
  message: string;
}

export function Welcome({ message }: WelcomeProps) {
  return (
    <section className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gold" />
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Welcome
          </h2>
          <p className="mt-8 font-serif text-2xl font-light leading-relaxed text-charcoal md:text-3xl">
            {message}
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gold" />
        </motion.div>
      </div>
    </section>
  );
}
