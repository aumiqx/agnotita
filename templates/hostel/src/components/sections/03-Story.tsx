"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { HostelPhoto } from "@/data/sample";

interface StoryProps {
  longDescription: string;
  photos: HostelPhoto[];
}

export function Story({ longDescription, photos }: StoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const paragraphs = longDescription.split("\n\n").filter(Boolean);
  const storyPhotos = photos.slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section label */}
        <div className="pt-20 pb-10">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-gray">
            Our Story
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left -- text scrolls normally */}
          <div className="lg:w-1/2 space-y-0">
            {paragraphs.map((para, i) => (
              <StoryParagraph key={i} text={para} index={i} />
            ))}
            <div className="h-[50vh]" />
          </div>

          {/* Right -- sticky photo that crossfades */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="sticky top-20 h-[70vh]">
              {storyPhotos.map((photo, i) => (
                <StoryPhoto
                  key={i}
                  photo={photo}
                  index={i}
                  total={storyPhotos.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryParagraph({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="mb-16">
      {index === 0 && (
        <motion.span
          className="font-serif text-6xl sm:text-7xl text-terracotta/30 float-left mr-3 mt-1 leading-[0.8]"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {text.charAt(0)}
        </motion.span>
      )}
      <p className="font-serif text-lg sm:text-xl leading-[1.8] text-charcoal/80">
        {index === 0 ? text.slice(1) : text}
      </p>

      {index === 1 && (
        <motion.blockquote
          className="mt-10 ml-8 border-l-2 border-terracotta/30 pl-6 font-handwritten text-2xl sm:text-3xl text-terracotta/70 italic leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          &ldquo;Come as a guest, leave as family.&rdquo;
        </motion.blockquote>
      )}
    </motion.div>
  );
}

function StoryPhoto({
  photo,
  index,
  total,
  scrollYProgress,
}: {
  photo: HostelPhoto;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeIn = start + segmentSize * 0.1;
  const fadeOut = start + segmentSize * 0.9;
  const end = (index + 1) * segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fadeIn, fadeOut, end]
      : index === total - 1
        ? [start, fadeIn, 1, 1]
        : [start, fadeIn, fadeOut, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 rounded-sm overflow-hidden photo-cursor"
      style={{ opacity }}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${photo.url})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      {photo.caption && (
        <span className="absolute bottom-6 left-6 font-handwritten text-lg text-white/70">
          {photo.caption}
        </span>
      )}
    </motion.div>
  );
}
