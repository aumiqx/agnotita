"use client";

import { motion } from "framer-motion";
import type { SpaService } from "@/data/sample";

interface WellnessProps {
  spa: {
    available: boolean;
    description: string;
    image: string;
    services: SpaService[];
  };
}

export function Wellness({ spa }: WellnessProps) {
  if (!spa.available) {
    return null;
  }

  return (
    <section className="bg-linen py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row-reverse md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2"
          >
            <div className="overflow-hidden">
              <img
                src={spa.image}
                alt="Wellness & Spa"
                className="h-80 w-full object-cover md:h-[500px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Wellness & Spa
            </h2>
            <h3 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
              Ancient healing, modern comfort
            </h3>

            <p className="mt-8 text-sm leading-relaxed text-charcoal-light">
              {spa.description}
            </p>

            <div className="mt-10 space-y-6">
              {spa.services.map((service) => (
                <div
                  key={service.name}
                  className="border-b border-warm-gray-dark pb-4"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-serif text-lg font-light text-charcoal">
                      {service.name}
                    </h4>
                    <span className="text-sm text-gold">
                      &#8377;{service.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal-light">
                    {service.duration} &middot; {service.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#reserve"
              className="mt-10 inline-block border border-charcoal px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase text-charcoal transition-all duration-500 hover:border-gold hover:bg-gold hover:text-white"
            >
              Book a Treatment
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
