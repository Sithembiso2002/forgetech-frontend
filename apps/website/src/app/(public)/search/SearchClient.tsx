// apps/website/src/app/(public)/search/SearchClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  FileText,
  BookOpen,
  Briefcase,
  Wrench,
  ChevronRight,
  AlertCircle,
  Clock,
} from "lucide-react";

// ── Type definitions ──
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  href: string;
  type?: string;       // e.g. "service", "blog", "project", "news"
}

// ── Helper to map result type to icon & label ──
const typeMeta: Record<string, { icon: React.ElementType; label: string }> = {
  service:    { icon: Wrench,     label: "Service" },
  blog:       { icon: BookOpen,   label: "Blog" },
  news:       { icon: FileText,   label: "News" },
  project:    { icon: Briefcase,  label: "Project" },
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const router = useRouter();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [localQuery, setLocalQuery] = useState(query);

  // Sync localQuery when query param changes (e.g., back navigation)
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Perform search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");

    fetch(`http://localhost:10000/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Search endpoint not available");
        return res.json();
      })
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Search is not available right now. Please try again later.");
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = localQuery.trim();
      if (trimmed && trimmed !== query) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [localQuery, query, router]
  );

  return (
    <div className="min-h-[60vh]">
      {/* ── Search Bar ── */}
      <form onSubmit={handleSearchSubmit} className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search services, articles, projects…"
            className="w-full pl-14 pr-5 py-4 bg-white border border-neutral-border/60 rounded-2xl text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-tech/30 focus:border-brand-tech transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-gold text-brand-navy px-5 py-2 rounded-xl font-semibold text-sm hover:bg-amber-400 transition-colors shadow-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Status indicator ── */}
      {query && (
        <p className="text-neutral-slate text-sm text-center mb-8">
          {loading
            ? "Searching…"
            : `Showing ${results.length} result${results.length !== 1 ? "s" : ""} for “${query}”`}
        </p>
      )}

      {/* ── Loading state ── */}
      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-border/30 animate-pulse">
              <div className="h-5 bg-neutral-border/50 rounded w-1/4 mb-3" />
              <div className="h-4 bg-neutral-border/30 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {/* ── Error state ── */}
      {error && (
        <div className="max-w-xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Search unavailable</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-brand-tech font-semibold hover:underline">
              Contact support <ChevronRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* ── Empty results ── */}
      {!loading && !error && results.length === 0 && query && (
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-2xl font-bold text-brand-deep mb-2">No results found</h2>
          <p className="text-neutral-slate mb-6">
            We couldn’t find anything for “{query}”. Try a different search term or browse our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/services" className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-2.5 text-sm font-semibold hover:bg-amber-400 transition-colors shadow-md">
              <Wrench size={16} />
              Explore services
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-brand-deep/20 text-brand-deep px-6 py-2.5 text-sm font-semibold hover:bg-brand-deep/5 transition-colors">
              <ArrowRight size={16} />
              Contact us
            </a>
          </div>
        </div>
      )}

      {/* ── Results list ── */}
      <AnimatePresence>
        {results.length > 0 && (
          <ul className="space-y-6">
            {results.map((item, index) => {
              const meta = item.type ? typeMeta[item.type] : null;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl border border-neutral-border/30 hover:shadow-xl hover:border-brand-tech/20 transition-all duration-300"
                >
                  <a href={item.href} className="flex items-start gap-4 p-6">
                    <div className="flex-shrink-0 mt-0.5">
                      {meta ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-tech/10 text-brand-tech text-xs font-semibold uppercase tracking-wide">
                          <meta.icon size={14} />
                          {meta.label}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-deep/10 text-brand-deep text-xs font-semibold uppercase tracking-wide">
                          <FileText size={14} />
                          Result
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-brand-deep mb-1 group-hover:text-brand-tech transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-neutral-slate line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-brand-tech opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={20} />
                    </div>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchClient() {
  return (
    <Suspense fallback={<div className="text-neutral-slate py-20 text-center">Loading search…</div>}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-deep mb-3">
            Search results
          </h1>
          <p className="text-neutral-slate text-lg max-w-xl mx-auto">
            Find services, articles, and projects across our site.
          </p>
        </div>
        <SearchResults />
      </div>
    </Suspense>
  );
}