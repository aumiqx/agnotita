"use client";

import { motion } from "framer-motion";

interface HowToReachProps {
  howToReach: {
    from: string;
    steps: { mode: string; description: string; duration: string }[];
  }[];
  hostelName: string;
}

const modeIcons: Record<string, string> = {
  bus: "\uD83D\uDE8C",
  train: "\uD83D\uDE86",
  flight: "\u2708\uFE0F",
  taxi: "\uD83D\uDE95",
  walk: "\uD83D\uDEB6",
  auto: "\uD83D\uDEFA",
};

export function HowToReach({ howToReach, hostelName }: HowToReachProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          how to reach
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Getting here
        </motion.h2>

        <div className="space-y-10">
          {howToReach.map((route, routeIndex) => (
            <motion.div
              key={route.from}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: routeIndex * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-sm p-6 sm:p-8"
            >
              <h3
                className="text-2xl mb-6"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                From {route.from}
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Starting point */}
                <div className="flex items-center gap-2 bg-cream px-3 py-2 rounded-sm">
                  <span className="text-lg">{"\uD83D\uDCCD"}</span>
                  <span className="text-sm font-medium text-charcoal">
                    {route.from}
                  </span>
                </div>

                {/* Steps */}
                {route.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-4">
                    {/* Arrow / connector */}
                    <div className="hidden sm:flex items-center">
                      <div className="w-8 sm:w-12 border-t-2 border-dashed border-sand" />
                      <svg
                        className="w-3 h-3 text-sand -ml-1"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                      >
                        <path d="M0 6l8-4v8z" />
                      </svg>
                    </div>

                    {/* Step card */}
                    <div className="flex items-center gap-2 bg-cream px-3 py-2 rounded-sm">
                      <span className="text-lg">{modeIcons[step.mode] ?? "\uD83D\uDEB6"}</span>
                      <div>
                        <p className="text-xs text-warm-gray">{step.description}</p>
                        <p className="text-xs text-terracotta font-medium">{step.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Destination */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center">
                    <div className="w-8 sm:w-12 border-t-2 border-dashed border-sand" />
                    <svg
                      className="w-3 h-3 text-terracotta -ml-1"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M0 6l8-4v8z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 bg-terracotta/10 border border-terracotta/20 px-3 py-2 rounded-sm">
                    <span className="text-lg">{"\uD83C\uDFE0"}</span>
                    <span className="text-sm font-medium text-charcoal">
                      {hostelName}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
