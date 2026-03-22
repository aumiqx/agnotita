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

export function WeatherMood({ weatherMood, city }: WeatherMoodProps) {
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
          weather mood
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-10"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          {weatherMood.season} in {city}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm p-6 sm:p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{"\u2600\uFE0F"}</div>
              <div>
                <p
                  className="text-3xl text-charcoal"
                  style={{ fontFamily: "var(--font-caveat)" }}
                >
                  {weatherMood.temperature}
                </p>
                <p className="text-sm text-warm-gray mt-1">
                  {weatherMood.season} average
                </p>
              </div>
            </div>

            <p className="text-warm-gray leading-relaxed">
              {weatherMood.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="bg-white rounded-sm p-6 sm:p-8"
          >
            <p
              className="text-2xl mb-5"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              Perfect for
            </p>

            <div className="flex flex-wrap gap-3">
              {weatherMood.activities.map((activity, i) => (
                <motion.span
                  key={activity}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="inline-block bg-cream border border-sand px-4 py-2 rounded-sm text-sm text-charcoal hover:border-terracotta transition-colors"
                >
                  {activity}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
