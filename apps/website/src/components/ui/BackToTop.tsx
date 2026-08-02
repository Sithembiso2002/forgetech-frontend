// apps/website/src/components/ui/BackToTop.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="group fixed right-6 bottom-24 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FFE38A] via-[#F5B11A] to-[#C98900] border-b-2 border-[#B87A00] shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-0.5"
    >
      <ArrowUp
        size={22}
        className="text-[#0B2447] transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
    </button>
  );
}