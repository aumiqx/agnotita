"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { HostelRoom } from "@/data/sample";

interface RoomsProps {
  rooms: HostelRoom[];
}

const amenityIcons: Record<string, string> = {
  "River View": "\uD83C\uDF0A",
  "Personal Locker": "\uD83D\uDD12",
  "Reading Light": "\uD83D\uDCA1",
  "USB Charging": "\uD83D\uDD0C",
  "Women Only": "\uD83D\uDC9C",
  "Privacy Curtains": "\uD83E\uDE9E",
  "Mirror": "\uD83E\uDE9E",
  "Open Air": "\u26FA",
  "Star Views": "\u2B50",
  "Sleeping Bag": "\uD83D\uDECC",
  "Shared Bath": "\uD83D\uDEB0",
  "Private Bath": "\uD83D\uDEB1",
  "Mountain View": "\u26F0\uFE0F",
  "Queen Bed": "\uD83D\uDECF\uFE0F",
  "Balcony": "\uD83C\uDF3F",
  "Unique Stay": "\u2728",
  "Forest View": "\uD83C\uDF32",
  "Private Deck": "\uD83C\uDFE1",
  "Hammock": "\uD83C\uDFDD\uFE0F",
};

export function Rooms({ rooms }: RoomsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          rooms
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Pick your spot
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-gray mb-10 text-base"
        >
          From dorms to treehouses. Every bed comes with a story.
        </motion.p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto hide-scrollbar px-6 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="shrink-0 w-[max(0px,calc((100vw-72rem)/2))]" />

        {rooms.map((room, i) => (
          <motion.div
            key={room.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="shrink-0 w-[300px] sm:w-[340px] bg-cream rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={room.photo}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                <span className="text-forest font-semibold text-sm">
                  {"\u20B9"}{room.price}
                </span>
                <span className="text-warm-gray text-xs">/night</span>
              </div>
            </div>

            <div className="p-5">
              <h3
                className="text-2xl mb-2"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {room.name}
              </h3>
              <p className="text-warm-gray text-sm mb-4 leading-relaxed">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-sm text-warm-gray"
                  >
                    <span>{amenityIcons[amenity] ?? "\u2713"}</span>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}
