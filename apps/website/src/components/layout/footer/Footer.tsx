// apps/website/src/components/layout/footer/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ---------- Real social media links (update with your actual URLs) ----------
const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF size={14} />,
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61574330018362", // ← replace with real link
  },
  {
    icon: <FaLinkedinIn size={14} />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/forgetech-nobles", // ← replace
  },
  {
    icon: <FaInstagram size={14} />,
    label: "Instagram",
    url: "https://www.instagram.com/forgetechnobles", // ← replace
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Newsletter subscription states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to subscribe.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Column 1: Logo + Description + Social Icons */}
          <div>
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 mb-4">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12">
                <Image
                  src="/images/logo/logo1.png"
                  alt="ForgeTech Nobles"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                />
              </div>
              <div className="flex flex-col leading-none">
                <h1 className="text-xs sm:text-sm md:text-base font-extrabold whitespace-nowrap">
                  <span className="text-white">ForgeTech</span>
                  <span className="text-brand-gold">Nobles</span>
                </h1>
                <span className="hidden sm:inline text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium text-white/80 whitespace-nowrap">
                  Smart Systems. Real Results.
                </span>
              </div>
            </Link>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Engineering smart systems that create real business results.
              Lesotho’s trusted full‑stack technology partner.
            </p>
            {/* ──────────────── Updated Social Icons ──────────────── */}
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-3 border-b border-white/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Blog", href: "/resources/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 sm:gap-2 text-neutral-300 hover:text-brand-gold transition-colors"
                  >
                    <ChevronRight size={12} className="text-brand-tech flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-3 border-b border-white/20 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "IT Infrastructure", href: "/services/infrastructure" },
                { label: "Custom Software", href: "/services/software" },
                { label: "Cloud Solutions", href: "/services/cloud" },
                { label: "Data & Analytics", href: "/services/analytics" },
                { label: "IT Support", href: "/services/support" },
              ].map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-1.5 sm:gap-2 text-neutral-300 hover:text-brand-gold transition-colors"
                  >
                    <ChevronRight size={12} className="text-brand-tech flex-shrink-0" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-3 border-b border-white/20 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 leading-relaxed">
                  Lesotho Housing and Land Development Corporation
                  <br />
                  MFQH+FMP, Maseru
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold flex-shrink-0" />
                <a
                  href="tel:+26663013383"
                  className="text-neutral-300 hover:text-brand-gold transition-colors"
                >
                  +266 6301 3383
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold flex-shrink-0" />
                <a
                  href="mailto:info@forgetechnobles.com"
                  className="text-neutral-300 hover:text-brand-gold transition-colors break-all"
                >
                  info@forgetechnobles.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 leading-relaxed">
                  Monday – Friday
                  <br />
                  08:00 AM – 17:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Stay Updated</h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Get the latest insights delivered to your inbox.
            </p>
          </div>
          {submitted ? (
            <div className="flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-lg text-sm">
              <CheckCircle size={18} />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 sm:w-56 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-brand-orange transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {loading ? "Sending..." : "Subscribe"}
              </button>
            </form>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm mt-2 sm:mt-0">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-neutral-400">
          <p>© {currentYear} ForgeTech Nobles. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-brand-gold transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}