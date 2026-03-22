"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface HowToReachProps {
  howToReach: {
    from: string;
    steps: { mode: string; description: string; duration: string }[];
  }[];
  hostelName: string;
}

const modeIcons: Record<string, string> = {
  bus: "M4 16V6a4 4 0 014-4h8a4 4 0 014 4v10M6 16v2M18 16v2M4 12h16",
  train: "M4 16V6a4 4 0 014-4h8a4 4 0 014 4v10l-2 4H6l-2-4zM9 20h6M12 2v4",
  flight: "M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z",
  taxi: "M3 12h18M5 12V7l2-4h10l2 4v5M7 16a1 1 0 100-2 1 1 0 000 2zM17 16a1 1 0 100-2 1 1 0 000 2z",
  walk: "M12 2a2 2 0 100 4 2 2 0 000-4zM10 8l-2 8 4-2 4 2-2-8M10 16l-2 6M14 16l2 6",
};

export function HowToReach({ howToReach, hostelName }: HowToReachProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section ref={containerRef} className="py-24 sm:py-32 px-6 bg-parchment">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Journey Map
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-16">
          Getting here
        </h2>

        <div className="space-y-16">
          {howToReach.map((route, routeIndex) => (
            <JourneyRoute
              key={route.from}
              route={route}
              hostelName={hostelName}
              routeIndex={routeIndex}
              scrollYProgress={scrollYProgress}
              totalRoutes={howToReach.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyRoute({
  route,
  hostelName,
  routeIndex,
  scrollYProgress,
  totalRoutes,
}: {
  route: HowToReachProps["howToReach"][0];
  hostelName: string;
  routeIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalRoutes: number;
}) {
  const segStart = routeIndex / totalRoutes;
  const segEnd = (routeIndex + 1) / totalRoutes;

  const pathProgress = useTransform(
    scrollYProgress,
    [segStart, segEnd],
    [0, 1]
  );

  const allStops = [
    { label: route.from, isStart: true, isEnd: false },
    ...route.steps.map((step) => ({
      label: step.description,
      duration: step.duration,
      mode: step.mode,
      isStart: false,
      isEnd: false,
    })),
    { label: hostelName, isStart: false, isEnd: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: routeIndex * 0.15 }}
    >
      <h3 className="font-handwritten text-2xl sm:text-3xl text-charcoal mb-8">
        From {route.from}
      </h3>

      <div className="relative pl-8">
        {/* Dotted path line */}
        <div className="absolute left-3 top-2 bottom-2 w-px border-l-2 border-dashed border-sand" />

        {/* Animated progress overlay */}
        <motion.div
          className="absolute left-3 top-2 w-px bg-terracotta origin-top"
          style={{
            scaleY: pathProgress,
            height: "calc(100% - 16px)",
          }}
        />

        <div className="space-y-8">
          {allStops.map((stop, i) => {
            const stopProgress = i / (allStops.length - 1);

            return (
              <motion.div
                key={i}
                className="relative flex items-start gap-5"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                {/* Dot */}
                <div className="absolute -left-8 top-1 z-10">
                  <StopDot
                    isStart={stop.isStart}
                    isEnd={stop.isEnd}
                    progress={pathProgress}
                    threshold={stopProgress}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {stop.isStart && (
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-charcoal">
                        {stop.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider text-warm-gray uppercase bg-sand/50 px-2 py-0.5 rounded-sm">
                        Start
                      </span>
                    </div>
                  )}

                  {stop.isEnd && (
                    <div className="flex items-center gap-3">
                      <span className="font-handwritten text-xl text-terracotta">
                        {stop.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider text-terracotta uppercase bg-terracotta/10 px-2 py-0.5 rounded-sm">
                        You&apos;re home
                      </span>
                    </div>
                  )}

                  {!stop.isStart && !stop.isEnd && "mode" in stop && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="var(--color-terracotta)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={modeIcons[stop.mode] ?? modeIcons.walk} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-charcoal/80">
                          {stop.label}
                        </p>
                        <p className="font-mono text-xs text-terracotta mt-0.5">
                          {stop.duration}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function StopDot({
  isStart,
  isEnd,
  progress,
  threshold,
}: {
  isStart: boolean;
  isEnd: boolean;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const dotScale = useTransform(progress, (v) =>
    v >= threshold ? 1 : 0.6
  );
  const dotColor = useTransform(progress, (v) =>
    v >= threshold ? "var(--color-terracotta)" : "var(--color-sand)"
  );

  if (isEnd) {
    return (
      <motion.div
        className="w-4 h-4 rounded-full border-2"
        style={{
          scale: dotScale,
          borderColor: dotColor,
          backgroundColor: dotColor,
        }}
      />
    );
  }

  return (
    <motion.div
      className="w-3 h-3 rounded-full border-2"
      style={{
        scale: dotScale,
        borderColor: dotColor,
        backgroundColor: isStart ? dotColor : "var(--color-parchment)",
      }}
    />
  );
}
