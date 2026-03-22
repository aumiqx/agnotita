"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { HostelPhoto } from "@/data/sample";

interface GalleryProps {
  photos: HostelPhoto[];
}

export function Gallery({ photos }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalSlides = photos.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(totalSlides - 1) * 85}%`]
  );

  const counterRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [1, totalSlides]
  );

  return (
    <section
      ref={containerRef}
      style={{ height: `${totalSlides * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        {/* Label */}
        <div className="absolute top-8 left-8 z-20">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
            Gallery
          </span>
        </div>

        {/* Counter */}
        <div className="absolute top-8 right-8 z-20 font-mono text-sm text-white/60">
          <Counter value={counterRaw} total={totalSlides} />
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          className="flex items-center h-full gap-8 pl-[10vw]"
          style={{ x }}
        >
          {photos.map((photo, i) => (
            <GallerySlide
              key={i}
              photo={photo}
              index={i}
              scrollYProgress={scrollYProgress}
              totalPhotos={totalSlides}
            />
          ))}
          <div className="shrink-0 w-[10vw]" />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="h-px bg-white/10">
            <motion.div
              className="h-full bg-terracotta"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  total,
}: {
  value: MotionValue<number>;
  total: number;
}) {
  const display = useTransform(value, (v: number) => Math.round(v));
  return (
    <motion.span>
      <motion.span className="text-white font-bold">{display}</motion.span>
      {" / "}
      {total}
    </motion.span>
  );
}

function GallerySlide({
  photo,
  index,
  scrollYProgress,
  totalPhotos,
}: {
  photo: HostelPhoto;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalPhotos: number;
}) {
  const segmentSize = 1 / totalPhotos;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  const parallaxY = useTransform(
    scrollYProgress,
    [start, end],
    [20 * (index % 2 === 0 ? 1 : -1), -20 * (index % 2 === 0 ? 1 : -1)]
  );

  const scale = useTransform(scrollYProgress, [start, mid, end], [0.92, 1, 0.92]);

  const slideOpacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.2),
      start + segmentSize * 0.2,
      mid,
      end - segmentSize * 0.2,
      Math.min(1, end + segmentSize * 0.2),
    ],
    [0.4, 1, 1, 1, 0.4]
  );

  return (
    <motion.div
      className="shrink-0 w-[80vw] h-[70vh] relative rounded-sm overflow-hidden photo-cursor"
      style={{ y: parallaxY, scale, opacity: slideOpacity }}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${photo.url})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      {photo.caption && (
        <div className="absolute bottom-8 left-8">
          <span className="font-handwritten text-xl text-white/80">
            {photo.caption}
          </span>
        </div>
      )}
    </motion.div>
  );
}
