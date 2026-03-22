"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { HouseRule } from "@/data/sample";

interface HouseRulesProps {
  houseRules: HouseRule[];
}

export function HouseRules({ houseRules }: HouseRulesProps) {
  return (
    <section className="py-24 sm:py-32 px-6 paper-texture overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          House Rules
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-4">
          The non-negotiables
        </h2>
        <p className="font-serif text-lg text-warm-gray mb-16">
          Not many, but we mean them.
        </p>

        <div className="space-y-6">
          {houseRules.map((rule, i) => (
            <RuleItem key={i} rule={rule} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RuleItem({ rule, index }: { rule: HouseRule; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Random rotation between -2 and 2 degrees, seeded by index
  const rotation = ((index * 7 + 3) % 5) - 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex items-start gap-5 bg-white/60 backdrop-blur-sm border border-sand/50 rounded-sm p-5 sm:p-6 hover:bg-white/80 transition-colors">
        <span className="text-2xl sm:text-3xl shrink-0 mt-0.5">
          {rule.icon}
        </span>
        <TypewriterText text={rule.rule} index={index} />
      </div>
    </motion.div>
  );
}

function TypewriterText({ text, index }: { text: string; index: number }) {
  return (
    <motion.p
      className="font-handwritten text-xl sm:text-2xl text-charcoal/80 leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
    >
      {text}
    </motion.p>
  );
}
