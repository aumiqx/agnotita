"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { HostelRoom } from "@/data/sample";

interface RoomsProps {
  rooms: HostelRoom[];
}

export function Rooms({ rooms }: RoomsProps) {
  return (
    <section className="relative bg-cream">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-8">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray block mb-4">
          Where You Sleep
        </span>
        <h2 className="font-handwritten text-5xl sm:text-6xl md:text-7xl text-charcoal">
          Pick your spot
        </h2>
      </div>

      {/* Stacking cards */}
      <div className="relative">
        {rooms.map((room, i) => (
          <RoomCard key={room.name} room={room} index={i} total={rooms.length} />
        ))}
      </div>
    </section>
  );
}

function RoomCard({
  room,
  index,
  total,
}: {
  room: HostelRoom;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, index < total - 1 ? 0.3 : 1]
  );

  return (
    <motion.div
      ref={ref}
      className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6"
      style={{ zIndex: index + 1, top: `${index * 2}rem` }}
    >
      <motion.div
        className="relative w-full max-w-6xl h-[75vh] sm:h-[80vh] rounded-sm overflow-hidden shadow-2xl"
        style={{ scale, opacity }}
      >
        {/* Photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center photo-cursor"
          style={{ backgroundImage: `url(${room.photo})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 md:p-16">
          {/* Price stamp */}
          <motion.div
            className="absolute top-8 right-8 sm:top-12 sm:right-12"
            initial={{ opacity: 0, rotate: -15, scale: 1.5 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="stamp bg-cream/90 backdrop-blur-sm">
              <div className="text-center">
                <span className="font-mono text-xs text-warm-gray block">
                  from
                </span>
                <span className="font-handwritten text-3xl sm:text-4xl text-terracotta">
                  &#8377;{room.price}
                </span>
                <span className="font-mono text-xs text-warm-gray block">
                  /night
                </span>
              </div>
            </div>
          </motion.div>

          {/* Room info */}
          <div className="max-w-lg">
            <motion.span
              className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 block mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </motion.span>

            <motion.h3
              className="font-handwritten text-4xl sm:text-5xl md:text-6xl text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {room.name}
            </motion.h3>

            <motion.p
              className="font-serif text-lg text-white/70 mb-8 max-w-md"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {room.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {room.amenities.map((amenity, j) => (
                <motion.span
                  key={amenity}
                  className="font-mono text-xs tracking-wider text-white/60 border border-white/20 px-3 py-1.5 rounded-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + j * 0.08 }}
                >
                  {amenity}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
