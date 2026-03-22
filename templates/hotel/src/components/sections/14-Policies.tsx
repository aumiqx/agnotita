"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Policy } from "@/data/sample";

interface PoliciesProps {
  policies: Policy[];
}

export function Policies({ policies }: PoliciesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const checkInPolicy = policies.find((p) =>
    p.title.toLowerCase().includes("check")
  );
  const otherPolicies = policies.filter((p) => p !== checkInPolicy);

  return (
    <section ref={ref} className="bg-linen py-32 lg:py-40 px-8">
      <div className="max-w-xl mx-auto">
        <motion.div
          className="border border-gold/20 bg-white p-10 lg:p-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-10">
            <p className="font-label text-gold text-xs mb-4">Information</p>
            <h2 className="font-serif text-2xl text-charcoal font-light">
              Hotel Policies
            </h2>
          </div>

          {checkInPolicy && (
            <div className="text-center mb-10 pb-10 border-b border-gold/15">
              <h3 className="font-serif text-xl text-charcoal mb-3">
                {checkInPolicy.title}
              </h3>
              <p className="text-warm text-sm leading-relaxed">
                {checkInPolicy.details}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {otherPolicies.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <h4 className="font-serif text-base text-charcoal mb-1">
                  {policy.title}
                </h4>
                <p className="text-warm/60 text-sm leading-relaxed">
                  {policy.details}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gold/10 text-center">
            <p className="text-warm/30 text-xs">
              Policies are subject to change. Please confirm at time of booking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
