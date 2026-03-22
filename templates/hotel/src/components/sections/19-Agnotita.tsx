"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AgnotitaProps {
  message: string;
  name: string;
}

export function Agnotita({ message, name }: AgnotitaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-ivory"
      style={{ padding: "clamp(80px, 12vh, 160px) 24px" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          className="font-serif italic text-warm/50 text-base leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href="https://aumiqx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-gold/40 text-[10px] tracking-[0.2em] relative group"
            data-cursor-hover
          >
            agnotita
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/30 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
