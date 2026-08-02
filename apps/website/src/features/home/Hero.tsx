"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Shield, BarChart3, Cloud, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
interface Slide {
  image: string;
  caption: string;
}

const slides: Slide[] = [
  {
    image: "/images/hero/ChatGPT Image Jul 11, 2026, 01_04_25 PM.png",
    caption: "Engineering Your Digital Future",
  },
  {
    image: "/images/hero/ChatGPT Image Jul 11, 2026, 12_58_29 PM.png",
    caption: "Secure Cloud Infrastructure",
  },
  {
    image: "/images/hero/ChatGPT Image Jul 11, 2026, 12_55_23 PM.png",
    caption: "Actionable Business Insights",
  },
];

const CONSTANT_SUBCAPTION =
  "Custom software tailored to your business, built with modern technologies and agile processes.";

const FALLBACK_IMAGE = "/images/hero/fallback.jpg";

// ----------------------------------------------------------------------
// Custom hook: auto‑play (never pauses)
// ----------------------------------------------------------------------
function useAutoPlay(
  slideCount: number,
  intervalMs: number = 9000
): [number, (index: number) => void] {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => setCurrent(((index % slideCount) + slideCount) % slideCount),
    [slideCount]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, intervalMs);
    timerRef.current = id;
    return () => clearInterval(id);
  }, [next, intervalMs]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return [current, goTo];
}

// ----------------------------------------------------------------------
// Hero Component
// ----------------------------------------------------------------------
export default function Hero() {
  const [currentSlide, goToSlide] = useAutoPlay(slides.length);
  const [imgError, setImgError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgError(false);
  }, [currentSlide]);

  const current = slides[currentSlide];

  const slideCards = slides.map((slide) => ({
    ...slide,
    label: slide.caption.split(" ")[0], // "Engineering", "Secure", "Actionable"
  }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden -mt-[60px] pt-[60px]"
      aria-roledescription="carousel"
      aria-label="Company highlights"
    >
      {/* Background (unchanged) */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={imgError ? FALLBACK_IMAGE : current.image}
              alt=""
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
              onError={() => setImgError(true)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-tech/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE4YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMTIgMThjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNC00LTEuNzkgNC00ek01MCA2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-32 flex flex-col justify-between h-full">
        {/* Top column */}
        <div className="max-w-3xl mx-auto lg:mx-0 lg:max-w-2xl">
          {/* Only the heading animates */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-white mb-4 md:mb-6">
                {current.caption}{" "}
                <span className="text-brand-gold whitespace-nowrap">Real Results.</span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Buttons – completely static */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Button
              href="/contact"
              variant="gold"
              className="px-5 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-2xl hover:scale-105 transition-transform"
            >
              Start a Project
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="px-5 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base border-white/30 text-white hover:bg-white/10 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Learn More<ChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Bottom row: Slide cards (left) + Subcaption + Trust points (right) */}
        <div className="mt-10 md:mt-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-8">
          {/* Slide indicator cards – bottom LEFT */}
          <div className="flex items-stretch gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto">
            {slideCards.map((card, index) => {
              const isActive = index === currentSlide;
              return (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-left transition-all duration-300 flex-1 min-w-0 lg:flex-initial ${
                    isActive
                      ? "bg-white/10 backdrop-blur-sm border border-brand-gold/30 shadow-lg scale-105"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.22 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="text-xs font-medium text-white/90 truncate">
                    {card.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full overflow-hidden">
                      <div
                        key={currentSlide}
                        className="h-full bg-brand-gold rounded-full animate-slide-progress"
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right column: Subcaption + Trust indicators */}
          <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
            {/* Subcaption – left on mobile, right on desktop */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md text-left lg:text-right">
              {CONSTANT_SUBCAPTION}
            </p>

            {/* Trust indicators – left aligned on mobile */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60 w-full lg:w-auto">
              <span className="flex items-center gap-1.5">
                <Shield size={18} className="text-brand-gold" />
                Enterprise‑Grade Security
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 size={18} className="text-brand-gold" />
                Data‑Driven Insights
              </span>
              <span className="flex items-center gap-1.5">
                <Cloud size={18} className="text-brand-gold" />
                Cloud‑Native Architecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}