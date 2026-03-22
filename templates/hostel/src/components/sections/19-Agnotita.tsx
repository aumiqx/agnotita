"use client";

import { motion } from "framer-motion";

interface AgnotitaProps {
  hostelName: string;
}

export function Agnotita({ hostelName }: AgnotitaProps) {
  return (
    <section className="py-24 sm:py-32 px-6 paper-texture overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Handwritten letter style */}
          <div className="bg-white/70 backdrop-blur-sm border border-sand/50 rounded-sm p-8 sm:p-12 md:p-16 relative">
            {/* Wax seal */}
            <motion.div
              className="absolute -top-6 right-8 sm:right-12"
              initial={{ opacity: 0, scale: 1.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="wax-seal">
                <span className="font-serif text-white text-xs font-bold tracking-wider">
                  AG
                </span>
              </div>
            </motion.div>

            <div className="font-handwritten text-xl sm:text-2xl text-charcoal/80 leading-relaxed space-y-6">
              <p className="text-terracotta/60 font-mono text-xs tracking-[0.3em] uppercase">
                A note from us
              </p>

              <p>
                We found {hostelName} on the internet.
              </p>

              <p>
                We thought it deserved to exist as more than a pin on Google
                Maps. So we built this — a place that feels the way your hostel
                feels.
              </p>

              <p>
                This is our gift to you. No strings attached. If you&apos;d like
                to make it yours, customize it, or build something even better
                together — let&apos;s talk.
              </p>

              <div className="pt-4">
                <p className="text-terracotta">With warmth,</p>
                <p className="text-terracotta text-2xl sm:text-3xl mt-1">
                  agnotita
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-sand/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.a
                href="https://aumiqx.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white px-6 py-3 font-mono text-xs tracking-wider rounded-sm transition-colors uppercase"
              >
                Visit aumiqx.com
              </motion.a>
              <span className="font-mono text-[10px] text-warm-gray/50 tracking-wider">
                Handcrafted with care
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
