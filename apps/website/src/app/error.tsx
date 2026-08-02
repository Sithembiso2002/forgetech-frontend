// apps/website/src/app/error.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/90 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center"
      >
        {/* Subtle warning icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-brand-gold" />
        </div>

        <h1 className="text-2xl font-bold text-brand-deep mb-2">
          Something went wrong
        </h1>
        <p className="text-neutral-slate text-base mb-8">
          We encountered an unexpected issue. Please try again or go back to
          the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-2.5 text-sm font-semibold hover:bg-amber-400 transition-colors shadow-md"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-deep/20 text-brand-deep px-6 py-2.5 text-sm font-semibold hover:bg-brand-deep/5 transition-colors"
          >
            <Home size={16} />
            Go home
          </Link>
        </div>

        {/* Collapsible debug info – only in development */}
        {error?.message && process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-neutral-slate cursor-pointer">
              Error details
            </summary>
            <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg p-3 break-all font-mono">
              {error.message}
            </p>
          </details>
        )}
      </motion.div>
    </div>
  );
}