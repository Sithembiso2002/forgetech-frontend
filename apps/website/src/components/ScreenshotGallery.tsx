// apps/website/src/components/ScreenshotGallery.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export default function ScreenshotGallery({
  screenshots,
  projectTitle,
}: ScreenshotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Keyboard nav + body scroll lock while lightbox is open
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight")
        setOpenIndex((i) =>
          i === null ? null : (i + 1) % screenshots.length,
        );
      else if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null
            ? null
            : (i - 1 + screenshots.length) % screenshots.length,
        );
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, screenshots.length]);

  if (!screenshots || screenshots.length === 0) return null;

  const close = () => setOpenIndex(null);
  const next = () =>
    setOpenIndex((i) =>
      i === null ? null : (i + 1) % screenshots.length,
    );
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + screenshots.length) % screenshots.length,
    );

  return (
    <>
      {/* Thumbnails grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-tech focus:ring-offset-2"
            aria-label={`Open screenshot ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${projectTitle} screenshot ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {mounted &&
        openIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
              {openIndex + 1} / {screenshots.length}
            </div>

            {/* Prev */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Full-size image (plain <img> so we always get the original,
                not a Next-optimized re-encode) */}
            <div
              className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshots[openIndex]}
                alt={`${projectTitle} screenshot ${openIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Next */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Thumbnail strip */}
            {screenshots.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2"
                onClick={(e) => e.stopPropagation()}
              >
                {screenshots.map((src, i) => (
                  <button
                    key={`thumb-${i}`}
                    onClick={() => setOpenIndex(i)}
                    className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === openIndex
                        ? "border-brand-gold"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Jump to screenshot ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}