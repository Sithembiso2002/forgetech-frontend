"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";

interface Industry {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  technologies: string[];
  cta: string;
}

export default function IndustriesInteractive({
  industries,
}: {
  industries: Industry[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null); // NEW
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // for outside‑click detection
  const [containerWidthPx, setContainerWidthPx] = useState(0);

  const [cardWidth, setCardWidth] = useState(220);
  const [gap, setGap] = useState(16);

  const [isHovered, setIsHovered] = useState(false);

  const updateDimensions = useCallback((width: number) => {
    if (width < 640) {
      setCardWidth(180);
      setGap(12);
    } else if (width < 1024) {
      setCardWidth(200);
      setGap(14);
    } else {
      setCardWidth(220);
      setGap(16);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize } = entry.contentBoxSize?.[0] ?? { inlineSize: entry.contentRect.width };
        setContainerWidthPx(inlineSize);
        updateDimensions(inlineSize);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateDimensions]);

  const totalWidth = industries.length * (cardWidth + gap);
  const xMotion = useMotionValue(0);
  const speed = 0.5;

  const duplicatedIndustries = [...industries, ...industries];

  // Pause if hovered OR if a card is locked
  useAnimationFrame(() => {
    if (isHovered || lockedIndex !== null) return;
    let currentX = xMotion.get();
    currentX -= speed;
    if (currentX <= -totalWidth) {
      currentX += totalWidth;
    }
    xMotion.set(currentX);
  });

  // Auto‑detect active index from scroll position (only when not locked)
  useEffect(() => {
    const updateActiveIndex = () => {
      if (lockedIndex !== null) {
        setActiveIndex(lockedIndex);
        return;
      }
      const x = xMotion.get();
      const centerX = containerWidthPx / 2;
      let minDist = Infinity;
      let closest = 0;
      for (let i = 0; i < industries.length; i++) {
        const cardCenterX = x + i * (cardWidth + gap) + cardWidth / 2;
        const dist = Math.abs(cardCenterX - centerX);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      setActiveIndex(closest);
    };
    const unsubscribe = xMotion.on("change", updateActiveIndex);
    return () => unsubscribe();
  }, [xMotion, containerWidthPx, industries.length, cardWidth, gap, lockedIndex]);

  // Outside‑click listener: unlock if click is outside the carousel container
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLockedIndex(null);
      }
    }
    if (lockedIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [lockedIndex]);

  const activeIndustry = industries[activeIndex];

  return (
    <div
      className="flex flex-col lg:flex-row gap-8 lg:gap-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LEFT COLUMN – Industry Carousel */}
      <div
        ref={containerRef}
        className="lg:w-[60%] relative overflow-hidden h-[320px] xs:h-[360px] sm:h-[420px] md:h-[520px] lg:h-[580px] xl:h-[620px] rounded-2xl"
      >
        <motion.div
          ref={leftTrackRef}
          style={{ x: xMotion }}
          className="flex gap-3 sm:gap-4 absolute top-0 left-0 h-full items-center"
        >
          {duplicatedIndustries.map((industry, index) => {
            const isActive = index === activeIndex || index === activeIndex + industries.length;
            return (
              <motion.div
                key={`${industry.id}-${index}`}
                onClick={() => {
                  const realIndex = index % industries.length;
                  setLockedIndex(realIndex);
                  setActiveIndex(realIndex);
                }}
                className={`relative flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[220px] h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
                  isActive ? "scale-105 border-2 border-brand-gold shadow-2xl" : "border border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{industry.name}</h3>
                  {isActive && <p className="text-xs mt-1 text-white/80">{industry.shortDescription}</p>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* RIGHT COLUMN – Active Industry Details */}
      <div className="lg:w-[40%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-3xl border border-neutral-border/60 bg-white p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/30 h-full"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-deep mb-4">
              {activeIndustry.name}
            </h3>
            <p className="text-base sm:text-lg text-neutral-slate leading-relaxed mb-6">
              {activeIndustry.description}
            </p>

            {activeIndustry.benefits.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-3">
                  Key Benefits
                </h4>
                <ul className="space-y-2">
                  {activeIndustry.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-neutral-slate">
                      <CheckCircle size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={`/industries/${activeIndustry.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-brand-navy shadow-lg transition-all duration-300 hover:bg-brand-orange hover:shadow-xl hover:scale-105"
            >
              {activeIndustry.cta}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}