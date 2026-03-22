"use client";

import { motion } from "framer-motion";
import type { TransportOption } from "@/data/sample";

interface GettingHereProps {
  options: TransportOption[];
  name: string;
}

function ModeIcon({ mode }: { mode: string }) {
  const icons: Record<string, React.ReactNode> = {
    Drive: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <rect x="3" y="8" width="18" height="8" rx="2" />
        <circle cx="7" cy="16" r="1.5" />
        <circle cx="17" cy="16" r="1.5" />
        <path d="M5 8l2-4h10l2 4" />
      </svg>
    ),
    Helicopter: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M4 6h16" />
        <path d="M12 6v5" />
        <ellipse cx="12" cy="14" rx="5" ry="3" />
        <path d="M17 14l3 4" />
        <path d="M7 14L4 18" />
      </svg>
    ),
  };

  return (
    <div className="text-gold">
      {icons[mode] || icons.Drive}
    </div>
  );
}

export function GettingHere({ options, name }: GettingHereProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Getting Here
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
            Your journey to {name}
          </p>
        </motion.div>

        <div className="space-y-8">
          {options.map((option, i) => (
            <motion.div
              key={option.from}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex gap-6 border-b border-warm-gray-dark pb-8"
            >
              <div className="mt-1 shrink-0">
                <ModeIcon mode={option.mode} />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                  <h3 className="font-serif text-lg font-light text-charcoal">
                    {option.from}
                  </h3>
                  <span className="text-xs tracking-wider text-gold">
                    {option.mode} &middot; {option.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {option.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
