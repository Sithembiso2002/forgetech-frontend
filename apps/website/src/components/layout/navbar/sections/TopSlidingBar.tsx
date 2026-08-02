"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { Phone, Mail, ArrowRight } from "lucide-react";

export interface TopSlidingBarService {
  title: string;
  slug: string;
}

interface TopSlidingBarProps {
  services?: TopSlidingBarService[];
  phone?: string;
  email?: string;
}

const FALLBACK_SERVICES: TopSlidingBarService[] = [
  { title: "IT Infrastructure & Networking", slug: "infrastructure" },
  { title: "Custom Software Development", slug: "software" },
  { title: "Cloud Solutions", slug: "cloud" },
  { title: "Data & Analytics", slug: "analytics" },
  { title: "IT Support Services", slug: "support" },
];

const SPEED = 80;

export default function TopSlidingBar({
  services = FALLBACK_SERVICES,
  phone = "+266 6301 3383",
  email = "info@forgetechnobles.com",
}: TopSlidingBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number>();
  const previousTime = useRef(0);
  const translateX = useRef(0);

  const paused = useRef(false);

  const displayServices =
    services.length > 0 ? services : FALLBACK_SERVICES;

  // Duplicate 3 times for perfect continuity
  const items = [
    ...displayServices,
    ...displayServices,
    ...displayServices,
  ];

  const getLoopWidth = useCallback(() => {
    if (!trackRef.current) return 0;

    return trackRef.current.scrollWidth / 3;
  }, []);

  const animate = useCallback(
    (time: number) => {
      if (!trackRef.current) return;

      if (!previousTime.current) {
        previousTime.current = time;
      }

      const delta = time - previousTime.current;
      previousTime.current = time;

      if (!paused.current) {
        translateX.current -= (SPEED * delta) / 1000;

        const loopWidth = getLoopWidth();

        if (-translateX.current >= loopWidth) {
          translateX.current += loopWidth;
        }

        trackRef.current.style.transform = `translate3d(${translateX.current}px,0,0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [getLoopWidth]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="hidden md:block relative border-b border-white/[0.08] text-xs">
      <div className="flex h-8">

        {/* LEFT */}

        <div className="relative w-[60%] overflow-hidden bg-gradient-to-r from-brand-navy via-brand-tech to-brand-deep">

          <div className="ticker-mask flex h-full items-center">

            <div
              ref={trackRef}
              role="marquee"
              aria-label="Our Services"
              className="ticker-track flex items-center whitespace-nowrap gap-10 pl-8"
              onMouseEnter={() => (paused.current = true)}
              onMouseLeave={() => {
                paused.current = false;
                previousTime.current = 0;
              }}
            >
              {items.map((service, index) => (
                <Link
                  key={`${service.slug}-${index}`}
                  href={`/services/${service.slug}`}
                  tabIndex={index < displayServices.length ? 0 : -1}
                  aria-hidden={index >= displayServices.length}
                  className="group flex shrink-0 items-center gap-1 font-medium tracking-wide text-white/90 transition-colors hover:text-brand-gold"
                >
                  {service.title}

                  <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex w-[40%] items-center justify-end gap-5 bg-brand-deep px-6 text-white/85">

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="hidden lg:flex items-center gap-1.5 transition-colors hover:text-brand-gold"
          >
            <Phone className="h-3 w-3" />
            <span>{phone}</span>
          </a>

          <a
            href={`mailto:${email}`}
            className="hidden lg:flex items-center gap-1.5 transition-colors hover:text-brand-gold"
          >
            <Mail className="h-3 w-3" />
            <span>{email}</span>
          </a>

        </div>

      </div>

      <style jsx>{`
        .ticker-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .ticker-track {
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
}