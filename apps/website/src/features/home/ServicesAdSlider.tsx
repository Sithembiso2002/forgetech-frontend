// apps/website/src/features/home/ServicesAdSlider.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ads = [
  {
    id: 1,
    tagline: "Your business needs a professional website.",
    description: "Let us help you grow your business DIGITALLY",
    bgImage:
      "/images/ChatGPT%20Image%20Aug%201%2C%202026%2C%2001_04_41%20AM.png",
  },
  {
    id: 2,
    tagline: "Turn your data into actionable insights.",
    description:
      "Dashboards and analytics that help you make smarter decisions — fast.",
    bgImage:
      "/images/ChatGPT%20Image%20Aug%201%2C%202026%2C%2001_11_47%20AM.png",
  },
  {
    id: 3,
    tagline: "Ready to digitally transform your operations?",
    description:
      "We modernise processes, automate workflows, and future‑proof your business.",
    bgImage:
      "/images/ChatGPT%20Image%20Aug%201%2C%202026%2C%2001_06_11%20AM.png",
  },
];

const CYCLE_DURATION = 9000;

export default function ServicesAdSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ads.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(advance, CYCLE_DURATION);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, advance]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const activeAd = ads[current];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-deep">
            Need a Solution Now?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-slate max-w-2xl mx-auto">
            Let our experts help you get started with a free consultation.
          </p>
        </div>

        <div
          className="relative w-full min-h-[360px] sm:min-h-[390px] md:min-h-[450px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Service advertisement"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAd.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row"
              style={{
                backgroundImage: `url(${activeAd.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Pro‑level gradient overlay – multi‑stop, preserves image details */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/90 via-brand-navy/40 to-transparent md:bg-gradient-to-l md:from-brand-navy/95 md:via-brand-navy/60 md:to-transparent pointer-events-none" />
              {/* Subtle radial glow behind text */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,177,26,0.15),transparent_70%)] pointer-events-none" />

              {/* Left zone – decorative icon with refined styling */}
              <div className="relative z-10 w-full md:w-2/5 flex items-end p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-white/30 backdrop-blur-sm bg-white/5 rounded-xl p-2"
                >
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Right zone – text & CTA with crisp typography */}
              <div className="relative z-10 flex-1 flex flex-col justify-center p-4 sm:p-6 md:p-10">
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] tracking-tight"
                >
                  {activeAd.tagline}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-medium"
                >
                  {activeAd.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,177,26,0.6)] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  >
                    Consult for Free
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label="Slide selector">
          {ads.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}: ${ad.tagline}`}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-deep focus:ring-offset-2 ${
                index === current
                  ? "bg-brand-deep scale-110"
                  : "bg-neutral-border hover:bg-brand-tech/50 hover:scale-110"
              }`}
            >
              {index === current && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-brand-deep"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}