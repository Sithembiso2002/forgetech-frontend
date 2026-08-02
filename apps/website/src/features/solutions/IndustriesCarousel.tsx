"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

export default function IndustriesCarousel({
  industries,
}: {
  industries: Industry[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 280; // w-72 = 18rem, plus gap
  const gap = 16;
  const totalWidth = industries.length * (cardWidth + gap);
  const speed = 0.5; // pixels per frame

  // Duplicate for seamless loop
  const duplicated = [...industries, ...industries];

  useAnimationFrame(() => {
    if (isHovered) return;
    let currentX = x.get();
    currentX -= speed;
    if (currentX <= -totalWidth) {
      currentX += totalWidth;
    }
    x.set(currentX);
  });

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl py-8"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{ x }}
        className="flex gap-4 items-stretch w-max"
      >
        {duplicated.map((industry, index) => (
          <Link
            key={`${industry.id}-${index}`}
            href={`/industries/${industry.slug}`}
            className="flex-shrink-0 w-72 rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="relative h-44">
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="288px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg leading-tight">
                  {industry.name}
                </h3>
                <p className="text-white/80 text-xs mt-1 line-clamp-2">
                  {industry.shortDescription}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}