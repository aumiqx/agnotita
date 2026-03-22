"use client";

import { motion } from "framer-motion";

interface AgnotitaProps {
  hostelName: string;
}

export function Agnotita({ hostelName }: AgnotitaProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream-dark">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-block mb-6 border-2 border-dashed border-terracotta/40 px-4 py-2 rounded-sm"
            style={{ transform: "rotate(-2deg)" }}
          >
            <span
              className="text-lg text-terracotta tracking-wider"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              a note from us
            </span>
          </div>

          <p className="text-warm-gray leading-relaxed text-base sm:text-lg mb-3">
            This website was handcrafted by{" "}
            <span className="text-charcoal font-medium">agnotita</span> for{" "}
            <span
              className="text-charcoal"
              style={{ fontFamily: "var(--font-caveat)", fontSize: "1.3em" }}
            >
              {hostelName}
            </span>
            .
          </p>

          <p className="text-warm-gray leading-relaxed text-base sm:text-lg mb-3">
            We found you on the internet, loved your vibe, and thought you
            deserved more than a Google Maps pin.
          </p>

          <p className="text-warm-gray leading-relaxed text-base sm:text-lg mb-8">
            If you want to make this yours — or if we got something wrong —
            let&apos;s talk.
          </p>

          <motion.a
            href="https://aumiqx.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white px-6 py-3 text-sm tracking-wider rounded-sm transition-colors"
          >
            built by aumiqx
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
