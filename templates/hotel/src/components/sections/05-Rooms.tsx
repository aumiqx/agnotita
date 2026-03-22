"use client";

import { motion } from "framer-motion";
import type { Room } from "@/data/sample";

interface RoomsProps {
  rooms: Room[];
}

export function Rooms({ rooms }: RoomsProps) {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Rooms & Suites
          </h2>
          <p className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
            Your private sanctuary
          </p>
        </motion.div>

        <div className="space-y-24">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2">
                <div className="overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[460px]"
                  />
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="font-serif text-2xl font-light text-charcoal md:text-3xl">
                  {room.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-gold">
                    {room.currency === "INR" ? "\u20B9" : "$"}
                    {room.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs tracking-wider text-charcoal-light uppercase">
                    per night
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-charcoal-light">
                  {room.description}
                </p>

                <div className="mt-6 flex gap-6 text-xs text-charcoal-light">
                  <span>{room.capacity}</span>
                  <span className="text-gold">&middot;</span>
                  <span>{room.size}</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="border border-warm-gray-dark px-3 py-1.5 text-xs text-charcoal-light"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
