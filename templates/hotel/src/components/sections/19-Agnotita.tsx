"use client";

import { motion } from "framer-motion";

interface AgnotitaProps {
  message: string;
  name: string;
}

export function Agnotita({ message, name }: AgnotitaProps) {
  return (
    <section className="bg-ivory py-24 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold">
            agnotita
          </p>

          <p className="mt-8 font-serif text-lg font-light leading-relaxed text-charcoal-light">
            {message}
          </p>

          <a
            href="https://aumiqx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-xs tracking-[0.2em] uppercase text-gold transition-colors duration-300 hover:text-gold-dark"
          >
            aumiqx.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
