"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GalleryProps {
  images: string[];
  name: string;
}

function ParallaxImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const isLarge = index % 3 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.1,
      }}
      className={`overflow-hidden ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <motion.div style={{ y }} className="h-full">
        <img
          src={src}
          alt={`${alt} - ${index + 1}`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          style={{ minHeight: isLarge ? "500px" : "280px" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Gallery({ images, name }: GalleryProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold"
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px]">
          {images.map((src, i) => (
            <ParallaxImage key={i} src={src} alt={name} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
