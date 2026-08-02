"use client";

import { Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function AboutCard() {
  const backgroundImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop";

  // Floating cards data – each with a unique gradient and animation
  const floatingCards = [
    {
      id: 1,
      text: "Smart Systems.",
      gradient: "linear-gradient(135deg, #00A8E8, #1E3A6D)",
      delay: 0,
      yOffset: [-10, 10],
    },
    {
      id: 2,
      text: "Real Results.",
      gradient: "linear-gradient(135deg, #F5B11A, #F28C28)",
      delay: 0.5,
      yOffset: [-15, 15],
    },
    {
      id: 3,
      text: "ForgeTech Nobles",
      gradient: "linear-gradient(135deg, #1E3A6D, #00A8E8)",
      delay: 1,
      yOffset: [-12, 12],
    },
  ];

  return (
    <section className="py-20 bg-neutral-offwhite">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Main About Card */}
          <div className="flex-1 w-full max-w-2xl">
            <div
              className="rounded-3xl shadow-2xl p-10 md:p-14 text-center text-white relative overflow-hidden"
              style={{
                background: `url('${backgroundImage}'), linear-gradient(135deg, #0B2447 0%, #1E3A6D 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/55 rounded-3xl" />

              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 rounded-full">
                  Get to Know Us Better
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                  About Us
                </h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  We’re not just another IT company. We’re a full‑stack technology
                  partner based in Maseru, Lesotho, engineering integrated digital
                  solutions — from secure infrastructure to AI‑powered analytics —
                  that help businesses modernise, scale, and succeed. Our team
                  combines deep local understanding with global best practices to
                  deliver{" "}
                  <strong className="text-white">Smart Systems</strong> that
                  drive{" "}
                  <strong className="text-brand-gold">Real Results</strong>.
                </p>
                <Button
                  href="/about"
                  variant="gold"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-base"
                >
                  <Users size={20} />
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Cards (desktop only) */}
          <div className="hidden lg:flex flex-col items-center gap-6 w-48">
            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                className="w-full h-24 rounded-2xl shadow-lg flex items-center justify-center font-bold text-white text-lg px-4 text-center"
                style={{ background: card.gradient }}
                initial={{ y: card.yOffset[0] }}
                animate={{ y: card.yOffset }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: card.delay,
                  ease: "easeInOut",
                }}
              >
                {card.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}