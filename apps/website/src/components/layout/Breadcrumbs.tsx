"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Ignore breadcrumbs on the homepage
  if (pathname === "/") return null;

  // Split the path, remove empty strings, and build segments
  const segments = pathname.split("/").filter((segment) => segment);

  // Build breadcrumb items with display names
  const breadcrumbs = segments.map((segment, index) => {
    // Convert slug to readable text (e.g., "case-studies" → "Case Studies")
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label, href, isLast: index === segments.length - 1 };
  });

  return (
    <nav
      className="bg-brand-navy border-b border-white/10"
      aria-label="Breadcrumb"
    >
      <div className="container mx-auto px-6 py-2">
        <ol className="flex items-center gap-1.5 text-xs font-medium text-white/60">
          {/* Home link */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>

          {breadcrumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-white/40" />
              {crumb.isLast ? (
                <span className="text-white font-semibold">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}