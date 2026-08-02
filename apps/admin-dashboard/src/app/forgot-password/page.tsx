"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { Mail, AlertCircle, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-deep to-brand-tech/20 p-6">
      <div className="w-full max-w-md">
        {/* Brand Logo / Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            ForgeTech<span className="text-brand-gold">Nobles</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm">Admin Dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-brand-deep">Check your email</h2>
              <p className="text-neutral-slate text-sm">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-brand-tech font-medium hover:underline mt-6"
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-deep mb-1">
                  Forgot your password?
                </h2>
                <p className="text-neutral-slate text-sm">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm animate-in fade-in">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-brand-deep mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@forgetechnobles.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition-shadow bg-white"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-deep text-white py-3 rounded-xl font-semibold hover:bg-brand-navy transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Back to login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-sm text-brand-tech hover:underline"
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} ForgeTech Nobles. All rights reserved.
        </p>
      </div>
    </div>
  );
}