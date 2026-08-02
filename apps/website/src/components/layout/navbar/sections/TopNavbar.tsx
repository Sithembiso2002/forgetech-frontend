"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Briefcase,
  LifeBuoy,
  ChevronDown,
  Search,
  X,
  Menu,
} from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "st", label: "Sesotho" },
];

interface TopNavbarProps {
  onMobileMenuToggle?: () => void;   // to open the sidebar
  mobileMenuOpen?: boolean;
}

export default function TopNavbar({ onMobileMenuToggle, mobileMenuOpen }: TopNavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const langRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close language dropdown & search on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const switchLanguage = (lang: (typeof languages)[0]) => {
    setCurrentLang(lang);
    setLangOpen(false);
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#0B2447] via-[#1E3A6D] to-[#0B2447] border-b border-white/10 shadow-sm">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* LEFT – Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
            <Image
              src="/images/logo/logo2.png"
              alt="ForgeTech Nobles"
              fill
              priority
              className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-xs sm:text-sm md:text-lg font-extrabold whitespace-nowrap">
              <span className="text-white">ForgeTech</span>
              <span className="text-brand-gold">Nobles</span>
            </h1>
            <span className="hidden sm:inline text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium text-white/80 whitespace-nowrap">
              Smart Systems. Real Results.
            </span>
          </div>
        </Link>

        {/* RIGHT – Pills (language, careers, support) + Search + Mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language pill */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-white/75 hover:text-white transition text-xs"
            >
              <Globe size={14} />
              <span className="font-medium">{currentLang.code.toUpperCase()}</span>
              <ChevronDown size={12} className={`transition ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      currentLang.code === lang.code ? "text-brand-tech font-semibold" : "text-gray-700"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Careers pill (hidden on smallest screens, shown as icon only) */}
          <Link
            href="/careers"
            className="flex items-center gap-1 text-white/75 hover:text-brand-gold transition text-xs"
          >
            <Briefcase size={14} />
            <span className="hidden sm:inline font-medium">Careers</span>
          </Link>

          {/* Support pill */}
          <Link
            href="/support"
            className="flex items-center gap-1 text-white/75 hover:text-brand-gold transition text-xs"
          >
            <LifeBuoy size={14} />
            <span className="hidden sm:inline font-medium">Support</span>
          </Link>

          
        </div>
      </div>
    </div>
  );
}