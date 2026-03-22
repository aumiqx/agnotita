"use client";

import { motion } from "framer-motion";
import type { EventSpace } from "@/data/sample";

interface EventsProps {
  events: {
    available: boolean;
    description: string;
    image: string;
    spaces: EventSpace[];
  };
}

export function Events({ events }: EventsProps) {
  if (!events.available) {
    return null;
  }

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2"
          >
            <div className="overflow-hidden">
              <img
                src={events.image}
                alt="Events & Meetings"
                className="h-80 w-full object-cover md:h-[480px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Events & Meetings
            </h2>
            <h3 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
              Exceptional spaces
            </h3>

            <p className="mt-8 text-sm leading-relaxed text-charcoal-light">
              {events.description}
            </p>

            <div className="mt-10 space-y-8">
              {events.spaces.map((space) => (
                <div key={space.name} className="border-l-2 border-gold pl-6">
                  <h4 className="font-serif text-lg font-light text-charcoal">
                    {space.name}
                  </h4>
                  <p className="mt-1 text-xs tracking-wider text-gold">
                    {space.capacity}
                  </p>
                  <p className="mt-2 text-sm text-charcoal-light">
                    {space.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {space.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="border border-warm-gray-dark px-2.5 py-1 text-[10px] tracking-wider text-charcoal-light uppercase"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#reserve"
              className="mt-10 inline-block border border-charcoal px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase text-charcoal transition-all duration-500 hover:border-gold hover:bg-gold hover:text-white"
            >
              Enquire Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
