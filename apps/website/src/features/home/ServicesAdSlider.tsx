// apps/website/src/features/home/ServicesAdSlider.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ads = [
  {
    id: 1,
    tagline: "Your business needs a professional website.",
    description:
      "Let us help you grow your business DIGITALLY",
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

const CYCLE_DURATION = 90000; // 1 minute 30 seconds

export default function ServicesAdSlider() {
  const [current, setCurrent] = useState(0);

  // Auto‑advance every CYCLE_DURATION
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, CYCLE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const activeAd = ads[current];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-deep">
            Need a Solution Now?
          </h2>
          <p className="mt-4 text-lg text-neutral-slate max-w-2xl mx-auto">
            Let our experts help you get started with a free consultation.
          </p>
        </div>

        {/* Card container – fixed height, full width */}
        <div className="relative w-full min-h-[390px] md:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAd.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row"
              style={{
                backgroundImage: `url(${activeAd.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient overlay – preserves image visibility */}
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-gray-900/80 via-gray-600/30 to-gray-100/20 pointer-events-none" />

              {/* Left zone (image area) – only the decorative icon */}
              <div className="relative z-10 w-full md:w-2/5 flex items-end p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-brand-navy/80"
                >
                  {/* Subtle decorative element */}
                  <svg
                    className="w-10 h-10"
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

              {/* Right zone – text & CTA */}
              <div className="relative z-10 flex-1 flex flex-col justify-center p-6 md:p-10">
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-extrabold text-brand-nav mb-4 leading-tight"
                >
                  {activeAd.tagline}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-white mb-6 max-w-md"
                >
                  {activeAd.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-3 text-sm font-bold hover:bg-amber-400 transition-colors shadow-lg active:scale-95"
                  >
                    Consult for Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}