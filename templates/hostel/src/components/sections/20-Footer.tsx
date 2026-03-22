"use client";

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

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Identity */}
          <div>
            <h3
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {name}
            </h3>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              {address}
            </p>
            <div className="space-y-1">
              <a
                href={`tel:${phone}`}
                className="block text-sm text-white/60 hover:text-terracotta transition-colors"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="block text-sm text-white/60 hover:text-terracotta transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Column 2: Social */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">
              Find us
            </h4>
            <div className="space-y-2">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/60 hover:text-terracotta transition-colors"
                >
                  Instagram
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/60 hover:text-terracotta transition-colors"
                >
                  Facebook
                </a>
              )}
              {social.tripadvisor && (
                <a
                  href={social.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/60 hover:text-terracotta transition-colors"
                >
                  TripAdvisor
                </a>
              )}
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/60 hover:text-terracotta transition-colors"
                >
                  Official Website
                </a>
              )}
            </div>
          </div>

          {/* Column 3: Map */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">
              Location
            </h4>
            <div className="rounded-sm overflow-hidden h-40">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${name} location`}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {year} {name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            made with care by{" "}
            <a
              href="https://aumiqx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-terracotta transition-colors"
            >
              agnotita
            </a>
            {" "}&times;{" "}
            <a
              href="https://aumiqx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-terracotta transition-colors"
            >
              aumiqx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
