"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ExperienceItem {
  title: string;
  description: string;
  icon: string;
}

interface ExperienceProps {
  items: ExperienceItem[];
  gallery: string[];
}

function ExperiencePanel({
  item,
  image,
  index,
}: {
  item: ExperienceItem;
  image: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-5 min-h-[70vh] items-center"
    >
      <motion.div
        className={`col-span-3 relative overflow-hidden h-[50vh] lg:h-[70vh] ${
          isReversed ? "lg:order-2" : ""
        }`}
        style={{ y: imgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>

      <div
        className={`col-span-2 px-8 lg:px-16 py-16 ${
          isReversed ? "lg:order-1" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gold-line mb-8" />
          <h3 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-6 text-charcoal">
            {item.title}
          </h3>
          <p className="text-warm text-base leading-relaxed max-w-sm">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Experience({ items, gallery }: ExperienceProps) {
  return (
    <section className="bg-ivory">
      {items.map((item, i) => (
        <ExperiencePanel
          key={item.title}
          item={item}
          image={gallery[i] || gallery[0]}
          index={i}
        />
      ))}
    </section>
  );
}
