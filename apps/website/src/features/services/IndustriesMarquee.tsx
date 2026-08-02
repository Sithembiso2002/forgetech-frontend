"use client";

import { useRef, useEffect, useCallback } from "react";

interface IndustriesMarqueeProps {
  industries: string[];
}

const SPEED_PX_PER_SEC = 80;

export default function IndustriesMarquee({ industries }: IndustriesMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const previousTime = useRef(0);
  const translateX = useRef(0);

  const items = [...industries, ...industries, ...industries]; // triple for seamless loop

  const getLoopWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 3;
  }, []);

  const animate = useCallback(
    (time: number) => {
      if (!trackRef.current) return;
      if (!previousTime.current) previousTime.current = time;

      const delta = time - previousTime.current;
      previousTime.current = time;

      translateX.current -= (SPEED_PX_PER_SEC * delta) / 1000; // move leftwards

      const loopWidth = getLoopWidth();
      if (loopWidth > 0 && -translateX.current >= loopWidth) {
        translateX.current += loopWidth; // seamless reset
      }

      trackRef.current.style.transform = `translate3d(${translateX.current}px, 0, 0)`;
      animationRef.current = requestAnimationFrame(animate);
    },
    [getLoopWidth]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ willChange: "transform", width: "max-content" }}
      >
        {items.map((industry, idx) => (
          <div
            key={`${industry}-${idx}`}
            className="inline-flex flex-shrink-0 items-center justify-center px-8 py-6 bg-neutral-offwhite rounded-2xl text-center shadow-sm"
            style={{ minWidth: "180px" }}
          >
            <div>
              <div className="text-2xl font-bold text-brand-deep mb-1">
                {industry}
              </div>
              <p className="text-xs text-neutral-slate uppercase tracking-wide">
                Trusted Partner
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}