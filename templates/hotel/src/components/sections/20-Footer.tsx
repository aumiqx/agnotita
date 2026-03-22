"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FooterProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  const labels: Record<string, string> = {
    instagram: "IG",
    facebook: "FB",
    twitter: "TW",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 text-[9px] font-label tracking-widest hover:border-gold hover:text-gold transition-all duration-500"
      data-cursor-hover
    >
      {labels[platform] || platform.charAt(0).toUpperCase()}
    </a>
  );
}

export function Footer({ name, address, phone, email, socialLinks }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-charcoal relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/30" />

      <div
        className="max-w-3xl mx-auto px-8 text-center"
        style={{ padding: "clamp(60px, 10vh, 120px) 24px" }}
      >
        <motion.h3
          className="font-serif text-gold text-[clamp(1.5rem,3vw,2rem)] font-light tracking-[0.08em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h3>

        <motion.p
          className="text-white/30 text-sm mb-8 leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {address}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="text-gold/50 text-sm hover:text-gold transition-colors duration-500"
            data-cursor-hover
          >
            {phone}
          </a>
          <span className="w-px h-3 bg-gold/20" />
          <a
            href={`mailto:${email}`}
            className="text-gold/50 text-sm hover:text-gold transition-colors duration-500"
            data-cursor-hover
          >
            {email}
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {Object.entries(socialLinks).map(
            ([platform, url]) =>
              url && <SocialIcon key={platform} platform={platform} url={url} />
          )}
        </motion.div>

        <motion.p
          className="text-gold/20 text-[9px] font-label tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Crafted by agnotita &times; aumiqx
        </motion.p>
      </div>
    </footer>
  );
}
