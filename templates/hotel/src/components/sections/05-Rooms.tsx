"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Room } from "@/data/sample";

interface RoomsProps {
  rooms: Room[];
}

function RoomSlide({ room, index }: { room: Room; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [60, 0, 0, -60]);

  const formatPrice = (price: number, currency: string) => {
    if (currency === "INR") return `\u20B9${price.toLocaleString("en-IN")}`;
    return `${currency} ${price}`;
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${room.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col justify-end h-full px-8 lg:px-20 pb-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <p className="font-label text-gold-light text-xs mb-4">
          Room {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-serif text-white text-[clamp(2rem,4vw,3.5rem)] font-light mb-4 max-w-xl">
          {room.name}
        </h3>
        <p className="text-white/70 text-sm max-w-md mb-6 leading-relaxed">
          {room.description}
        </p>

        <div className="flex items-center gap-8">
          <span className="font-serif text-gold text-2xl">
            {formatPrice(room.price, room.currency)}
            <span className="text-white/40 text-sm ml-2">/ night</span>
          </span>
          <span className="text-white/40 text-xs font-label">{room.size}</span>
          <span className="text-white/40 text-xs font-label">{room.capacity}</span>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="text-white/50 text-xs px-3 py-1 border border-white/10 rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function Rooms({ rooms }: RoomsProps) {
  return (
    <div>
      {rooms.map((room, i) => (
        <RoomSlide key={room.name} room={room} index={i} />
      ))}
    </div>
  );
}
