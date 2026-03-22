"use client";

import { motion } from "framer-motion";

interface WeatherMoodProps {
  weatherMood: {
    season: string;
    temperature: string;
    description: string;
    activities: string[];
  };
  city: string;
}

const seasonThemes: Record<
  string,
  {
    bg: string;
    accent: string;
    gradient: string;
    label: string;
  }
> = {
  January: { bg: "#FFF5EB", accent: "#D4764E", gradient: "from-orange-50 to-amber-50", label: "Winter" },
  February: { bg: "#FFF5EB", accent: "#D4764E", gradient: "from-orange-50 to-amber-50", label: "Winter" },
  March: { bg: "#F0FFF0", accent: "#3D6B4F", gradient: "from-green-50 to-emerald-50", label: "Spring" },
  April: { bg: "#F0FFF0", accent: "#3D6B4F", gradient: "from-green-50 to-emerald-50", label: "Spring" },
  May: { bg: "#FFFFF0", accent: "#B8860B", gradient: "from-yellow-50 to-amber-50", label: "Summer" },
  June: { bg: "#F0F8FF", accent: "#4682B4", gradient: "from-blue-50 to-slate-50", label: "Monsoon" },
  July: { bg: "#F0F8FF", accent: "#4682B4", gradient: "from-blue-50 to-slate-50", label: "Monsoon" },
  August: { bg: "#F0F8FF", accent: "#4682B4", gradient: "from-blue-50 to-slate-50", label: "Monsoon" },
  September: { bg: "#F5FFF5", accent: "#2E8B57", gradient: "from-green-50 to-teal-50", label: "Post-Monsoon" },
  October: { bg: "#FDFBF7", accent: "#C17B5E", gradient: "from-orange-50 to-yellow-50", label: "Autumn" },
  November: { bg: "#F8F5F0", accent: "#8B7355", gradient: "from-stone-50 to-amber-50", label: "Autumn" },
  December: { bg: "#FFF5EB", accent: "#D4764E", gradient: "from-orange-50 to-amber-50", label: "Winter" },
};

export function WeatherMood({ weatherMood, city }: WeatherMoodProps) {
  const theme = seasonThemes[weatherMood.season] ?? seasonThemes.March;

  return (
    <section
      className="py-24 sm:py-32 px-6 transition-colors duration-1000"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Weather &amp; Seasons
        </span>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: big temperature + season */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-handwritten text-5xl sm:text-6xl text-charcoal mb-2">
              {weatherMood.season} in {city}
            </h2>

            <div className="flex items-end gap-3 mb-6">
              <span
                className="font-serif text-6xl sm:text-7xl md:text-8xl leading-none"
                style={{ color: theme.accent }}
              >
                {weatherMood.temperature}
              </span>
            </div>

            <div
              className="inline-block px-4 py-1.5 rounded-sm font-mono text-xs tracking-[0.2em] uppercase mb-8"
              style={{
                backgroundColor: theme.accent + "15",
                color: theme.accent,
              }}
            >
              {theme.label}
            </div>

            <p className="font-serif text-lg leading-relaxed text-charcoal/70 max-w-md">
              {weatherMood.description}
            </p>
          </motion.div>

          {/* Right: activities */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-handwritten text-3xl text-charcoal mb-8">
              Perfect for
            </h3>

            <div className="space-y-4">
              {weatherMood.activities.map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: theme.accent + "20" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>
                  <span className="font-serif text-lg text-charcoal/80 group-hover:text-charcoal transition-colors">
                    {activity}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
