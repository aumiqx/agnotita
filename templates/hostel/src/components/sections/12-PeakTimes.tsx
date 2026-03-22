"use client";

import { motion } from "framer-motion";
import type { MonthData } from "@/data/sample";

interface PeakTimesProps {
  monthlyData: MonthData[];
}

export function PeakTimes({ monthlyData }: PeakTimesProps) {
  const currentMonth = new Date().getMonth();

  const crowdLabels = ["", "Empty", "Quiet", "Calm", "Moderate", "Busy", "Popular", "Packed", "Peak", "Crazy", "Insane"];

  return (
    <section className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          peak times
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          When to visit
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-12 text-base max-w-xl"
        >
          Crowd levels throughout the year. Lower bars mean fewer people and more peace.
        </motion.p>

        <div className="flex items-end gap-2 sm:gap-3 h-64">
          {monthlyData.map((month, i) => {
            const isCurrentMonth = i === currentMonth;
            const barHeight = (month.crowdLevel / 10) * 100;

            return (
              <motion.div
                key={month.shortMonth}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col items-center gap-2 origin-bottom"
              >
                <div className="relative w-full group">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-charcoal text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {month.weather} &middot; {crowdLabels[month.crowdLevel] ?? ""}
                    </div>
                  </div>

                  <div
                    className={`w-full rounded-t-sm transition-colors ${
                      isCurrentMonth
                        ? "bg-terracotta"
                        : "bg-sand hover:bg-terracotta/40"
                    }`}
                    style={{ height: `${barHeight}%`, minHeight: 8 }}
                  />
                </div>

                <span
                  className={`text-xs ${
                    isCurrentMonth
                      ? "text-terracotta font-semibold"
                      : "text-warm-gray"
                  }`}
                >
                  {month.shortMonth}
                </span>

                {isCurrentMonth && (
                  <span className="text-[10px] text-terracotta font-medium -mt-1">
                    now
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
