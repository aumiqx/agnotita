"use client";

import { motion } from "framer-motion";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIconMap: Record<string, string> = {
  "Free Wi-Fi": "\uD83D\uDCF6",
  "Hot Water": "\uD83D\uDEB0",
  "Shared Kitchen": "\uD83C\uDF73",
  "Personal Lockers": "\uD83D\uDD12",
  "Rooftop Terrace": "\uD83C\uDF07",
  "Laundry Service": "\uD83E\uDDFA",
  "Book Exchange": "\uD83D\uDCDA",
  "Yoga Space": "\uD83E\uDDD8",
  "Guitar Corner": "\uD83C\uDFB8",
  "Travel Desk": "\uD83D\uDDFA\uFE0F",
  "Filtered Water": "\uD83D\uDCA7",
  "Common Room": "\uD83D\uDECB\uFE0F",
  "Board Games": "\uD83C\uDFB2",
  "Chai Station": "\u2615",
  "Luggage Storage": "\uD83E\uDDF3",
};

export function Amenities({ amenities }: AmenitiesProps) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-warm-gray mb-4"
        >
          amenities
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl mb-12"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          What we've got
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-sm p-4 text-center hover:shadow-md transition-shadow group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {amenityIconMap[amenity] ?? "\u2713"}
              </div>
              <p className="text-sm text-warm-gray font-medium">{amenity}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
