// apps/website/src/components/layout/navbar/sections/BottomNavbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Search,
  X,
  ArrowRight,
  Cloud,
  Code,
  Shield,
  BarChart3,
  Headphones,
  Building2,
  Globe,
  Newspaper,
  BookOpen,
  Briefcase,
  PhoneCall,
} from "lucide-react";

const mainNavLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    items: [
      { label: "IT Infrastructure & Networking", href: "/services/infrastructure", icon: Shield },
      { label: "Custom Software Development", href: "/services/software", icon: Code },
      { label: "Cloud Solutions", href: "/services/cloud", icon: Cloud },
      { label: "Data & Analytics", href: "/services/analytics", icon: BarChart3 },
      { label: "IT Support Services", href: "/services/support", icon: Headphones },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    hasDropdown: true,
    items: [
      { label: "Small Business Packages", href: "/solutions/sme", icon: Briefcase },
      { label: "Enterprise Transformation", href: "/solutions/enterprise", icon: Building2 },
      { label: "NGOs & Government", href: "/solutions/ngo", icon: Globe },
    ],
  },
  { label: "Experience", href: "/projects" },
  {
    label: "Resources",
    href: "/resources/blog",
    hasDropdown: true,
    items: [
      { label: "Blog", href: "/resources/blog", icon: Newspaper },
      { label: "News & Insights", href: "/resources/news", icon: Globe },
      { label: "Technology Guides", href: "/resources/guides", icon: BookOpen },
    ],
  },
  { label: "About", href: "/about" },
];

interface BottomNavbarProps {
  scrolled: boolean;
  mobileMenuIcon: React.ReactNode;
  onMobileToggle: () => void;
}

export default function BottomNavbar({
  scrolled,
  mobileMenuIcon,
  onMobileToggle,
}: BottomNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // ── Search Dropdown State ──
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Auto‑focus input when dropdown opens
  useEffect(() => {
    if (searchDropdownOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchDropdownOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchDropdownOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1450px] mx-auto px-4 sm:px-8 flex items-center h-[64px] md:h-[76px] relative">
        {/* LEFT – Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-full transition-colors duration-200 shrink-0"
          style={{ color: scrolled ? "#1E3A6D" : "#ffffff" }}
          onClick={onMobileToggle}
          aria-label="Toggle menu"
        >
          {mobileMenuIcon}
        </button>

        {/* CENTER – Desktop navigation */}
        <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-7">
            {mainNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 pb-1 ${
                      scrolled
                        ? "text-brand-deep hover:text-brand-tech"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] origin-left transition-transform duration-300 ${
                        active
                          ? "scale-x-100 bg-brand-gold"
                          : "scale-x-0 bg-brand-gold group-hover:scale-x-100"
                      }`}
                    />
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    )}
                  </Link>
                  {link.hasDropdown && link.items && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/50 opacity-0 invisible translate-y-2 scale-95 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out z-50 py-3">
                      <div className="absolute -top-3 left-0 right-0 h-3" />
                      {link.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-slate hover:text-brand-tech hover:bg-brand-deep/5 transition-colors rounded-lg mx-2"
                        >
                          {item.icon && <item.icon size={18} className="text-brand-tech/70 shrink-0" />}
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-100 mt-1 pt-2 px-4">
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-tech hover:text-brand-deep transition-colors"
                        >
                          View All {link.label} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Spacer (mobile) */}
        <div className="flex-1 lg:hidden" />

        {/* RIGHT – Search Dropdown + Contact CTA */}
        <div className="flex items-center gap-3 lg:gap-6 shrink-0 lg:ml-auto">
          {/* ── Search Dropdown ── */}
          <div ref={searchContainerRef} className="relative">
            {/* Search icon button */}
            <button
              aria-label="Toggle search"
              onClick={() => {
                setSearchDropdownOpen(!searchDropdownOpen);
                setSearchQuery("");
              }}
              className={`p-1.5 rounded-full transition-all duration-200 ${
                scrolled
                  ? "text-brand-deep hover:bg-slate-100"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Search size={26} />
            </button>

            {/* Dropdown panel – appears below, doesn't affect layout */}
            {searchDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 p-3 animate-in slide-in-from-top-2 fade-in duration-200 z-50">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services, articles…"
                    className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-deep placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-tech/30 focus:border-brand-tech transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-gold text-brand-navy font-semibold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contact Us – gold CTA */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] px-4 py-2 rounded-full font-semibold tracking-wide bg-brand-gold text-brand-navy shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <PhoneCall size={14} />
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}