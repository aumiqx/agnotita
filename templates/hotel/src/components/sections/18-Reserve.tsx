"use client";

import { motion } from "framer-motion";

interface ReserveProps {
  name: string;
  bookingUrl: string;
  phone: string;
  whatsapp: string;
}

export function Reserve({ name, bookingUrl, phone, whatsapp }: ReserveProps) {
  return (
    <section id="reserve" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gold" />

          <h2 className="font-serif text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Begin Your Stay
          </h2>

          <p className="mt-6 font-serif text-3xl font-light text-charcoal md:text-4xl">
            We look forward to welcoming you to {name}
          </p>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-gold px-12 py-4 text-xs font-medium tracking-[0.25em] uppercase text-white transition-colors duration-500 hover:bg-gold-dark"
          >
            Reserve Your Stay
          </a>

          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
            <a
              href={`tel:${phone}`}
              className="text-sm text-charcoal-light transition-colors duration-300 hover:text-gold"
            >
              {phone}
            </a>
            <span className="hidden text-gold md:block">&middot;</span>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-charcoal-light transition-colors duration-300 hover:text-gold"
            >
              WhatsApp
            </a>
          </div>

          <div className="mx-auto mt-8 h-px w-16 bg-gold" />
        </motion.div>
      </div>
    </section>
  );
}
