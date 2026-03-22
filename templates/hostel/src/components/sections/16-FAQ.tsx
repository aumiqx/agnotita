"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FAQItem } from "@/data/sample";

interface FAQProps {
  faq: FAQItem[];
}

const journalDates = [
  "Day 1, Morning",
  "Day 1, Afternoon",
  "Day 2, Morning",
  "Day 2, Evening",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
];

export function FAQ({ faq }: FAQProps) {
  return (
    <section className="py-24 sm:py-32 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          FAQ
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-4">
          Travel journal
        </h2>
        <p className="font-serif text-lg text-warm-gray mb-16">
          Questions every traveler asks, answered honestly.
        </p>

        <div className="journal-lines bg-white rounded-sm p-6 sm:p-10 shadow-sm">
          {/* Red margin line */}
          <div className="relative">
            <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-px bg-red-200/40" />

            <div className="space-y-0">
              {faq.map((item, i) => (
                <JournalEntry
                  key={i}
                  item={item}
                  index={i}
                  date={journalDates[i] ?? `Day ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalEntry({
  item,
  index,
  date,
}: {
  item: FAQItem;
  index: number;
  date: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-sand/30 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start py-5 text-left group pl-12 sm:pl-14"
      >
        <div className="flex-1">
          <span className="font-mono text-[10px] tracking-wider text-terracotta/60 uppercase block mb-1">
            {date}
          </span>
          <span className="font-handwritten text-xl sm:text-2xl text-charcoal group-hover:text-terracotta transition-colors leading-snug">
            {item.question}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl text-warm-gray/50 ml-4 mt-5"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-12 sm:pl-14 pr-8 pb-6">
              <p className="font-serif text-base text-warm-gray leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
