"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FAQItem } from "@/data/sample";

interface FAQProps {
  faq: FAQItem[];
}

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="border-b border-sand last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base sm:text-lg text-charcoal pr-4 group-hover:text-terracotta transition-colors">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-2xl text-warm-gray leading-none"
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed pb-5 pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ faq }: FAQProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          faq
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-10"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Questions people ask
        </motion.h2>

        <div className="bg-cream rounded-sm p-6 sm:p-8">
          {faq.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
