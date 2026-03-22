"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  description: string;
  icon: string;
}

interface ExperienceProps {
  items: ExperienceItem[];
}

function ExperienceIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    river: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
        <path d="M6 28c6-4 12 4 18 0s12-4 18 0" />
        <path d="M6 36c6-4 12 4 18 0s12-4 18 0" />
        <path d="M24 8v14" />
        <circle cx="24" cy="6" r="2" />
      </svg>
    ),
    spa: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
        <path d="M24 40c-8-6-14-12-14-20a14 14 0 0128 0c0 8-6 14-14 20z" />
        <path d="M24 16v16" />
        <path d="M18 22l6 6 6-6" />
      </svg>
    ),
    dining: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
        <circle cx="24" cy="24" r="14" />
        <path d="M18 18v12" />
        <path d="M15 18h6v4a3 3 0 01-6 0v-4z" />
        <path d="M30 18v12" />
        <path d="M30 18c2 0 3 2 3 4s-1 4-3 4" />
      </svg>
    ),
    concierge: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
        <path d="M12 32h24" />
        <path d="M14 32v-4a10 10 0 0120 0v4" />
        <circle cx="24" cy="16" r="3" />
        <path d="M10 36h28" />
      </svg>
    ),
  };

  return (
    <div className="text-gold">
      {icons[type] || icons.concierge}
    </div>
  );
}

export function Experience({ items }: ExperienceProps) {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold"
        >
          The Experience
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                <ExperienceIcon type={item.icon} />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
