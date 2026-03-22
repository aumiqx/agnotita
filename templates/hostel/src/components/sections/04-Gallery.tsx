"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GalleryProps {
  photos: { url: string; caption?: string }[];
}

export function Gallery({ photos }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const masonryPattern = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          gallery
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          Snapshots from here
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {photos.slice(0, 8).map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`${masonryPattern[i] ?? "col-span-1 row-span-1"} relative overflow-hidden rounded-sm shadow-md cursor-pointer group`}
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={photo.url}
                alt={photo.caption ?? `Photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs sm:text-sm">{photo.caption}</p>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex].url}
                alt={photos[selectedIndex].caption ?? "Photo"}
                className="w-full h-full object-contain rounded-sm"
              />
              {photos[selectedIndex].caption && (
                <p className="text-white/80 text-center mt-4 text-sm">
                  {photos[selectedIndex].caption}
                </p>
              )}

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl p-2"
              >
                &times;
              </button>

              {selectedIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(selectedIndex - 1);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2"
                >
                  &lsaquo;
                </button>
              )}

              {selectedIndex < photos.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(selectedIndex + 1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2"
                >
                  &rsaquo;
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
