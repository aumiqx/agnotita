"use client";

import { motion } from "framer-motion";

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
  mapEmbedUrl: string;
}

export function Footer({
  name,
  address,
  phone,
  email,
  socialLinks,
  mapEmbedUrl,
}: FooterProps) {
  return (
    <footer className="bg-charcoal py-20 text-white/80">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="font-serif text-2xl font-light text-white">
                {name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {address}
              </p>

              <div className="mt-6 space-y-2">
                <a
                  href={`tel:${phone}`}
                  className="block text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                >
                  {email}
                </a>
              </div>

              <div className="mt-6 flex gap-6">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider text-white/40 uppercase transition-colors duration-300 hover:text-gold"
                  >
                    Instagram
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider text-white/40 uppercase transition-colors duration-300 hover:text-gold"
                  >
                    Facebook
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider text-white/40 uppercase transition-colors duration-300 hover:text-gold"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="h-64 w-full overflow-hidden md:h-full">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "250px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${name} location`}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8 text-center">
            <p className="text-xs tracking-wider text-white/30">
              Crafted by{" "}
              <a
                href="https://aumiqx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 transition-colors duration-300 hover:text-gold"
              >
                agnotita
              </a>{" "}
              &times;{" "}
              <a
                href="https://aumiqx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 transition-colors duration-300 hover:text-gold"
              >
                aumiqx
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
