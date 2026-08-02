"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="py-16 md:py-24 bg-white border-t border-neutral-border/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep mb-4">
            Get our latest insights straight to your inbox
          </h2>
          <p className="text-base sm:text-lg text-neutral-slate mb-8">
            Stay ahead with practical technology guides, industry news, and tips — delivered monthly.
          </p>

          {submitted ? (
            <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 sm:p-6 animate-in fade-in">
              <p className="font-semibold text-lg text-brand-deep">Thank you for subscribing!</p>
              <p className="text-sm text-neutral-slate mt-1">We’ll keep you posted.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border border-neutral-border rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-brand-deep placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-brand-orange transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-sm flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <p className="text-xs text-neutral-400 mt-6">
            *By submitting this form, I consent to receiving emails and agree to the{" "}
            <a href="/privacy-policy" className="underline hover:text-brand-deep transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}