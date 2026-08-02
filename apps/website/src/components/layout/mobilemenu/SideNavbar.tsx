// apps/website/src/components/layout/mobilemenu/SideNavbar.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Headphones,
  Home,
  Wrench,
  Lightbulb,
  FolderOpen,
  BookOpen,
  MessageCircle,
  Globe,
  Briefcase,
  LifeBuoy,
  ArrowRight,
  Cloud,
  Code,
  Shield,
  BarChart3,
  Smartphone,
  Monitor,
  GraduationCap,
  Building2,
  Landmark,
  HeartPulse,
  Hotel,
  Newspaper,
  FileText,
  Users,
} from "lucide-react";

// ----------------------------------------------------------------------
// Custom Social Icons (inline SVGs)
// ----------------------------------------------------------------------
const FacebookIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M12,7.5A4.5,4.5 0 0,0 7.5,12A4.5,4.5 0 0,0 12,16.5A4.5,4.5 0 0,0 16.5,12A4.5,4.5 0 0,0 12,7.5M17.5,7.5A1,1 0 0,1 18.5,6.5A1,1 0 0,1 19.5,7.5A1,1 0 0,1 18.5,8.5A1,1 0 0,1 17.5,7.5M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
  </svg>
);

const GithubIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------
interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  description?: string;
  children?: NavItem[];
}

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "st", label: "Sesotho" },
];

const contactInfo = [
  { icon: Phone, label: "Sales", value: "+266 6301 3383", href: "tel:+26663013383" },
  { icon: Headphones, label: "Support", value: "+266 6301 3383", href: "tel:+26663013383" },
  { icon: Mail, label: "Email", value: "info@forgetechnobles.com", href: "mailto:info@forgetechnobles.com" },
];

// Social icons – now using custom SVG components
const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: WhatsAppIcon, href: "https://wa.me/26663013383", label: "WhatsApp" },
];

// Main navigation structure
const mainNavLinks: NavItem[] = [
  { label: "Home", href: "/", icon: Home, description: "Back to homepage" },
  {
    label: "Services",
    href: "/services",
    icon: Wrench,
    description: "Software, Cloud & Infrastructure",
    children: [
      { label: "IT Infrastructure & Networking", href: "/services/infrastructure", icon: Shield },
      { label: "Custom Software Development", href: "/services/software", icon: Code },
      { label: "Web Development", href: "/services/web-development", icon: Monitor },
      { label: "Mobile App Development", href: "/services/mobile", icon: Smartphone },
      { label: "Cloud Solutions", href: "/services/cloud", icon: Cloud },
      { label: "Data & Analytics", href: "/services/analytics", icon: BarChart3 },
      { label: "IT Support Services", href: "/services/support", icon: Headphones },
      { label: "Digital Transformation Consulting", href: "/services/consulting", icon: Lightbulb },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    icon: Lightbulb,
    description: "Tailored for your industry",
    children: [
      { label: "SMEs", href: "/solutions/sme", icon: Briefcase },
      { label: "Enterprise", href: "/solutions/enterprise", icon: Building2 },
      { label: "Government", href: "/solutions/government", icon: Landmark },
      { label: "NGOs", href: "/solutions/ngo", icon: Users },
      { label: "Education", href: "/solutions/education", icon: GraduationCap },
      { label: "Healthcare", href: "/solutions/healthcare", icon: HeartPulse },
      { label: "Hospitality", href: "/solutions/hospitality", icon: Hotel },
    ],
  },
  { label: "Case Studies", href: "/case-studies", icon: FolderOpen, description: "Our success stories" },
  {
    label: "Resources",
    href: "/resources/blog",
    icon: BookOpen,
    description: "Blog, News & Guides",
    children: [
      { label: "Blog", href: "/resources/blog", icon: Newspaper },
      { label: "News & Insights", href: "/resources/news", icon: Globe },
      { label: "Technology Guides", href: "/resources/guides", icon: FileText },
    ],
  },
  { label: "Contact", href: "/contact", icon: MessageCircle, description: "Get in touch" },
];

interface SideNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------
export default function SideNavbar({ isOpen, onClose }: SideNavbarProps) {
  // Accordion state
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  // Language dropdown state
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const langRef = useRef<HTMLDivElement>(null);
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Toggle accordion section
  const toggleSection = useCallback((label: string) => {
    setExpandedSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const switchLanguage = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setLangOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer – slides in from left */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 h-full w-[90%] max-w-[420px] bg-white/90 backdrop-blur-xl shadow-2xl flex flex-col rounded-r-2xl border-r border-white/20"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            {/* ── Header with logo centered + close button absolute right ── */}
            <div className="px-5 pt-6 pb-4 border-b border-gray-200/50">
              <div className="relative flex items-center justify-center mb-4">
                <Link href="/" onClick={handleNavClick} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                    <Image
                      src="/images/logo/logo2.png"
                      alt="ForgeTech Nobles"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold text-[#0B2447]">
                      ForgeTech<span className="text-[#F5B11A]">Nobles</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Smart Systems. Real Results.
                    </span>
                  </div>
                </Link>
                <button
                  onClick={onClose}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} className="text-gray-700" />
                </button>
              </div>

              {/* Pills: Language, Careers, Support (left‑aligned) */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Language pill */}
                <div ref={langRef} className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Globe size={14} />
                    {currentLang.code.toUpperCase()}
                    <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
                  </button>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute left-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => switchLanguage(lang)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${lang.code === currentLang.code ? "text-[#00A8E8] font-semibold" : "text-gray-700"}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <Link href="/careers" onClick={handleNavClick} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                  <Briefcase size={14} />
                  Careers
                </Link>
                <Link href="/support" onClick={handleNavClick} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                  <LifeBuoy size={14} />
                  Support
                </Link>
              </div>
            </div>

            {/* ── Scrollable content ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, projects..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] transition-all"
                />
              </form>

              {/* Navigation cards */}
              <nav className="space-y-3">
                {mainNavLinks.map(link => (
                  <div key={link.label}>
                    {link.children ? (
                      <>
                        <motion.button
                          onClick={() => toggleSection(link.label)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group"
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            {link.icon && <link.icon size={22} className="text-[#00A8E8] group-hover:text-[#1E3A6D] transition-colors" />}
                            <div className="text-left">
                              <div className="text-sm font-semibold text-[#1F2937]">{link.label}</div>
                              {link.description && <div className="text-xs text-gray-500">{link.description}</div>}
                            </div>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`text-gray-400 transition-transform duration-200 ${expandedSections.includes(link.label) ? "rotate-180" : ""}`}
                          />
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {expandedSections.includes(link.label) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-4 mt-2 space-y-2"
                            >
                              {link.children.map(child => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={handleNavClick}
                                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-sm hover:border-[#00A8E8]/30 transition-all group"
                                >
                                  {child.icon && <child.icon size={18} className="text-[#00A8E8] group-hover:text-[#1E3A6D]" />}
                                  <span className="text-sm font-medium text-gray-700">{child.label}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={handleNavClick}
                        className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-3">
                          {link.icon && <link.icon size={22} className="text-[#00A8E8] group-hover:text-[#1E3A6D] transition-colors" />}
                          <div className="text-left">
                            <div className="text-sm font-semibold text-[#1F2937]">{link.label}</div>
                            {link.description && <div className="text-xs text-gray-500">{link.description}</div>}
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA Card */}
              <motion.div
                className="rounded-3xl bg-gradient-to-br from-[#1E3A6D] to-[#0B2447] p-6 text-white shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-bold mb-2">Need help building your next digital solution?</h3>
                <p className="text-sm text-white/70 mb-4">Talk to our engineers today.</p>
                <Link
                  href="/contact"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#F5B11A] text-[#0B2447] font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone size={16} />
                  Book Consultation
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map(contact => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5B11A]/10 flex items-center justify-center">
                      <contact.icon size={20} className="text-[#F5B11A] group-hover:text-[#1E3A6D] transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase">{contact.label}</div>
                      <div className="text-sm font-medium text-[#1F2937]">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social icons – now Facebook, Instagram, GitHub, WhatsApp */}
              <div className="flex items-center gap-3 justify-center">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1E3A6D] hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-current" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-5 py-4 border-t border-gray-200/50 text-center">
              <p className="text-xs font-semibold text-[#0B2447]">ForgeTech Nobles</p>
              <p className="text-[10px] text-gray-500">Version 2026 · © {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}