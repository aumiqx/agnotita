"use client";

import { motion } from "framer-motion";

interface MeetTheHostProps {
  hostName: string;
  hostPhoto: string;
  hostQuote: string;
}

export function MeetTheHost({
  hostName,
  hostPhoto,
  hostQuote,
}: MeetTheHostProps) {
  return (
    <section className="py-24 sm:py-32 px-6 cork-texture overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/50 block mb-4">
          Meet The Host
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-white mb-16">
          The humans behind this
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          {/* Polaroid photo */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="shrink-0"
          >
            <div className="bg-white p-3 pb-14 shadow-xl relative">
              <img
                src={hostPhoto}
                alt={hostName}
                className="w-52 h-52 sm:w-64 sm:h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="font-handwritten text-xl text-charcoal">
                  {hostName}
                </span>
              </div>

              {/* Tape effect on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 rotate-1 shadow-sm" />
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative">
              {/* Quote mark */}
              <span className="font-serif text-[6rem] leading-none text-white/15 absolute -top-8 -left-4 select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10 font-serif text-xl sm:text-2xl text-white/90 leading-relaxed pl-2">
                {hostQuote}
              </blockquote>

              <div className="mt-8 flex items-center gap-3">
                <div className="w-12 h-px bg-terracotta/60" />
                <span className="font-handwritten text-lg text-terracotta">
                  {hostName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
