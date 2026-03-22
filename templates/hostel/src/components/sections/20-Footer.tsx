"use client";

import { motion } from "framer-motion";

interface FooterProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
    website?: string;
  };
  coordinates: { lat: number; lng: number };
}

export function Footer({
  name,
  address,
  phone,
  email,
  social,
  coordinates,
}: FooterProps) {
  const mapUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white/80 relative">
      {/* Map with warm overlay */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "sepia(30%) saturate(80%) brightness(90%)" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${name} location`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Column 1: Identity */}
          <div className="md:w-1/3">
            <h3 className="font-handwritten text-4xl text-white mb-4">
              {name}
            </h3>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              {address}
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-terracotta transition-colors group"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:rotate-12 transition-transform"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-terracotta transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {email}
              </a>
            </div>
          </div>

          {/* Column 2: Social */}
          <div className="md:w-1/3">
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
              Find us
            </h4>
            <div className="space-y-3">
              {social.instagram && (
                <SocialLink href={social.instagram} label="Instagram" />
              )}
              {social.facebook && (
                <SocialLink href={social.facebook} label="Facebook" />
              )}
              {social.tripadvisor && (
                <SocialLink href={social.tripadvisor} label="TripAdvisor" />
              )}
              {social.website && (
                <SocialLink href={social.website} label="Official Website" />
              )}
            </div>
          </div>

          {/* Column 3: Scroll to top compass */}
          <div className="md:w-1/3 flex md:justify-end items-start">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-3"
            >
              {/* Hand-drawn compass arrow */}
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-terracotta transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/40 group-hover:text-terracotta transition-colors"
                >
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-handwritten text-sm text-white/30 group-hover:text-terracotta transition-colors">
                back to top
              </span>
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/20 tracking-wider">
            &copy; {year} {name}
          </p>
          <p className="font-mono text-[10px] text-white/20 tracking-wider">
            crafted by{" "}
            <a
              href="https://aumiqx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-terracotta transition-colors"
            >
              agnotita
            </a>
            {" "}&times;{" "}
            <a
              href="https://aumiqx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-terracotta transition-colors"
            >
              aumiqx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-white/40 hover:text-terracotta transition-colors group"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-terracotta transition-colors" />
      {label}
    </a>
  );
}
