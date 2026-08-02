// apps/website/src/features/home/NewsCarousel.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  date: string;
  published?: boolean;
}

export default function NewsCarousel({ news }: { news: NewsItem[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const total = Array.isArray(news) ? news.length : 0;
  if (total === 0) return null;

  const wrapIndex = useCallback(
    (index: number) => ((index % total) + total) % total,
    [total]
  );

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(wrapIndex(index));
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Autoplay – pauses on hover
  useEffect(() => {
    if (total <= 1 || isHovered) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => wrapIndex(prev + 1));
    }, 6000);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [total, isHovered, wrapIndex]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prevIndex = wrapIndex(current - 1);
  const nextIndex = wrapIndex(current + 1);

  return (
    <section className="py-16 md:py-28 bg-gradient-to-b from-white to-neutral-offwhite/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header – refined typography */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-brand-tech/10 text-brand-tech border border-brand-tech/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-tech animate-pulse" />
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-brand-deep">
            News &amp; Insights
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-slate max-w-2xl mx-auto px-2">
            Stay updated with our latest events, community involvement, and industry perspectives.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows – glass style */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all flex items-center justify-center -ml-5 md:-ml-7 border border-white/60"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-deep" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all flex items-center justify-center -mr-5 md:-mr-7 border border-white/60"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-deep" />
          </button>

          {/* Slides Viewport */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              {/* Previous Slide */}
              <motion.div
                key={`prev-${news[prevIndex].id}`}
                custom={direction}
                initial={{ x: -220, opacity: 0, scale: 0.82, rotateY: 15 }}
                animate={{ x: -60, opacity: 0.6, scale: 0.88, rotateY: 10, md: { x: -130, scale: 0.88, rotateY: 10 } } as any}
                exit={{ x: -220, opacity: 0, scale: 0.82, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-0 w-[60%] md:w-[50%] h-[85%] cursor-pointer z-0"
                onClick={() => goTo(prevIndex)}
              >
                <SlideCard news={news[prevIndex]} isActive={false} />
              </motion.div>

              {/* Current Slide – active with floating animation */}
              <motion.div
                key={`current-${news[current].id}`}
                custom={direction}
                initial={{ x: direction > 0 ? 350 : -350, opacity: 0, scale: 0.9, rotateY: direction > 0 ? -15 : 15 }}
                animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ x: direction > 0 ? -350 : 350, opacity: 0, scale: 0.9, rotateY: direction > 0 ? 15 : -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute z-10 w-[90%] md:w-[70%] h-full shadow-2xl rounded-3xl overflow-hidden"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-full"
                >
                  <SlideCard news={news[current]} isActive={true} />
                </motion.div>
              </motion.div>

              {/* Next Slide */}
              <motion.div
                key={`next-${news[nextIndex].id}`}
                custom={direction}
                initial={{ x: 220, opacity: 0, scale: 0.82, rotateY: -15 }}
                animate={{ x: 60, opacity: 0.6, scale: 0.88, rotateY: -10, md: { x: 130, scale: 0.88, rotateY: -10 } } as any}
                exit={{ x: 220, opacity: 0, scale: 0.82, rotateY: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute right-0 w-[60%] md:w-[50%] h-[85%] cursor-pointer z-0"
                onClick={() => goTo(nextIndex)}
              >
                <SlideCard news={news[nextIndex]} isActive={false} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress‑based dot indicators */}
          <div className="flex justify-center gap-3 mt-8 md:mt-10">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${
                  index === current ? "w-12 bg-slate-200" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === current && (
                  <motion.div
                    className="absolute inset-0 bg-brand-gold rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={current}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Premium slide card with hover glow
function SlideCard({ news, isActive }: { news: NewsItem; isActive: boolean }) {
  const fallbackImage = "https://placehold.co/800x500/1E3A6D/ffffff?text=No+Image";

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden group">
      <Image
        src={news.image || fallbackImage}
        alt={news.title || "News article"}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Gradient overlay – stronger at bottom */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/25 to-transparent transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-80 group-hover:opacity-90"
        }`}
      />
      {/* Subtle glow on active card */}
      {isActive && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold/10 to-brand-tech/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 text-white">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-gold">
          {news.date}
        </span>
        <h3
          className={`font-extrabold mt-1 sm:mt-2 mb-2 sm:mb-3 leading-tight transition-all duration-300 ${
            isActive ? "text-xl sm:text-3xl md:text-5xl" : "text-lg sm:text-xl md:text-3xl"
          }`}
        >
          {news.title}
        </h3>
        {isActive && (
          <p className="text-xs sm:text-sm md:text-lg text-white/80 line-clamp-2 mb-4 sm:mb-6">
            {news.summary}
          </p>
        )}
        <a
          href={`/resources/news/${news.slug}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-gold hover:text-brand-orange transition-colors"
        >
          Read more <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </a>
      </div>
    </div>
  );
}