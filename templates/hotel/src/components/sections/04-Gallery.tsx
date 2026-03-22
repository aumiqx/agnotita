"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GalleryProps {
  images: string[];
  name: string;
}

export function Gallery({ images, name }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-(images.length - 1) * 72}%`]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${images.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          className="flex gap-6 pl-[15vw]"
          style={{ x }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: "70vw", height: "75vh" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute bottom-12 right-12 font-label text-warm/50 text-xs">
          <motion.span className="text-gold">
            {name}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
