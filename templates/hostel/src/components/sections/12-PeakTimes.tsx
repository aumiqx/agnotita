"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { MonthData } from "@/data/sample";

interface PeakTimesProps {
  monthlyData: MonthData[];
}

const crowdLabels: Record<number, string> = {
  1: "Empty",
  2: "Quiet",
  3: "Calm",
  4: "Moderate",
  5: "Busy",
  6: "Popular",
  7: "Packed",
  8: "Peak",
  9: "Crazy",
  10: "Insane",
};

export function PeakTimes({ monthlyData }: PeakTimesProps) {
  const currentMonth = new Date().getMonth();
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const maxCrowd = 10;
  const size = 380;
  const center = size / 2;
  const outerRadius = size / 2 - 30;
  const innerRadius = 60;

  return (
    <section className="py-24 sm:py-32 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Peak Times
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-4">
          When to visit
        </h2>
        <p className="font-serif text-lg text-warm-gray mb-16 max-w-xl">
          Crowd levels throughout the year. Quieter months mean more peace.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Radial chart */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="overflow-visible">
              {monthlyData.map((month, i) => {
                const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
                const nextAngle = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2;
                const crowdRadius =
                  innerRadius +
                  (month.crowdLevel / maxCrowd) * (outerRadius - innerRadius);

                const x1 = center + innerRadius * Math.cos(angle);
                const y1 = center + innerRadius * Math.sin(angle);
                const x2 = center + crowdRadius * Math.cos(angle);
                const y2 = center + crowdRadius * Math.sin(angle);
                const x3 = center + crowdRadius * Math.cos(nextAngle);
                const y3 = center + crowdRadius * Math.sin(nextAngle);
                const x4 = center + innerRadius * Math.cos(nextAngle);
                const y4 = center + innerRadius * Math.sin(nextAngle);

                const largeArc = 0;
                const isCurrentMonth = i === currentMonth;
                const isHovered = hoveredMonth === i;

                const labelRadius = outerRadius + 18;
                const midAngle = (angle + nextAngle) / 2;
                const labelX = center + labelRadius * Math.cos(midAngle);
                const labelY = center + labelRadius * Math.sin(midAngle);

                return (
                  <g key={month.shortMonth}>
                    <motion.path
                      d={`M ${x1} ${y1} L ${x2} ${y2} A ${crowdRadius} ${crowdRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`}
                      fill={
                        isCurrentMonth
                          ? "var(--color-terracotta)"
                          : isHovered
                            ? "var(--color-terracotta)"
                            : "var(--color-sand)"
                      }
                      fillOpacity={isCurrentMonth ? 1 : isHovered ? 0.7 : 0.6}
                      stroke="var(--color-cream)"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      style={{ transformOrigin: `${center}px ${center}px` }}
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="cursor-pointer transition-colors duration-200"
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-mono text-[10px] tracking-wider select-none ${
                        isCurrentMonth
                          ? "fill-terracotta font-bold"
                          : "fill-warm-gray"
                      }`}
                    >
                      {month.shortMonth}
                    </text>
                  </g>
                );
              })}

              {/* Center text */}
              <text
                x={center}
                y={center - 8}
                textAnchor="middle"
                className="font-handwritten text-lg fill-charcoal"
              >
                {hoveredMonth !== null
                  ? monthlyData[hoveredMonth].shortMonth
                  : monthlyData[currentMonth].shortMonth}
              </text>
              <text
                x={center}
                y={center + 12}
                textAnchor="middle"
                className="font-mono text-[10px] fill-warm-gray"
              >
                {hoveredMonth !== null
                  ? crowdLabels[monthlyData[hoveredMonth].crowdLevel] ?? ""
                  : "now"}
              </text>
            </svg>

            {/* Glow on current month */}
            {currentMonth >= 0 && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 8,
                  height: 8,
                  left:
                    center +
                    (outerRadius + 18) *
                      Math.cos(
                        ((currentMonth + 0.5) / 12) * 2 * Math.PI - Math.PI / 2
                      ) -
                    4,
                  top:
                    center +
                    (outerRadius + 18) *
                      Math.sin(
                        ((currentMonth + 0.5) / 12) * 2 * Math.PI - Math.PI / 2
                      ) -
                    4,
                  backgroundColor: "var(--color-terracotta)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(193,123,94,0.4)",
                    "0 0 0 8px rgba(193,123,94,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Details panel */}
          <div className="flex-1 max-w-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {hoveredMonth !== null ? (
                <div>
                  <h3 className="font-handwritten text-3xl text-charcoal mb-2">
                    {monthlyData[hoveredMonth].month}
                  </h3>
                  <p className="font-mono text-xs tracking-wider text-warm-gray mb-4 uppercase">
                    {monthlyData[hoveredMonth].weather} &middot;{" "}
                    {crowdLabels[monthlyData[hoveredMonth].crowdLevel]}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-2 flex-1 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor:
                            j < monthlyData[hoveredMonth].crowdLevel
                              ? "var(--color-terracotta)"
                              : "var(--color-sand)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="font-serif text-warm-gray italic">
                  Hover over the chart to explore each month.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
