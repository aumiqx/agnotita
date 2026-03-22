"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ReserveProps {
  name: string;
  bookingUrl: string;
  phone: string;
  whatsapp: string;
}

export function Reserve({ name, bookingUrl, phone, whatsapp }: ReserveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="reserve"
      className="bg-white"
      style={{ padding: "clamp(100px, 15vh, 200px) 24px" }}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          className="font-serif text-[clamp(2rem,4vw,3rem)] text-charcoal font-light mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Begin Your Stay
        </motion.h2>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="block font-serif text-2xl text-charcoal relative group"
            data-cursor-hover
          >
            {phone}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>

          <div className="gold-line mx-auto" />

          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            className="block font-serif text-lg text-warm/60 relative group italic"
            data-cursor-hover
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>

          <a
            href={bookingUrl}
            className="block font-serif text-lg text-warm/60 relative group italic"
            data-cursor-hover
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve Online
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
