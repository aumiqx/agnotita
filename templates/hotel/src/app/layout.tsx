import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "The Ganges Retreat | Luxury Hotel in Rishikesh",
  description:
    "A luxury riverside retreat in Rishikesh offering river-facing rooms, Ayurvedic spa, rooftop dining, and curated Himalayan experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
