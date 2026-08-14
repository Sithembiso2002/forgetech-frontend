"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { AlertCircle, CheckCircle, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function UpdatePasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null); // null = checking

  // Check if there is an active recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setHasSession(!!session);
    };
    checkSession();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Optionally sign out so the user can log in with the new password
      await supabase.auth.signOut();
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  // Loading / checking session
  if (hasSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-deep to-brand-tech/20 p-6">
        <Loader2 size={32} className="animate-spin text-white" />
      </div>
    );
  }

  // If no session, show expired/invalid link message
  if (hasSession === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-deep to-brand-tech/20 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-brand-deep mb-2">Link expired or invalid</h2>
          <p className="text-neutral-slate text-sm mb-6">
            Your password reset link is no longer valid. Please request a new one.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block bg-brand-deep text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-navy transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-deep to-brand-tech/20 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-brand-deep mb-2">Password Updated!</h2>
          <p className="text-neutral-slate text-sm mb-4">
            Your password has been changed successfully. You will be redirected to the login page.
          </p>
          <Link
            href="/login"
            className="inline-block bg-brand-deep text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-navy transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Update password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-brand-deep to-brand-tech/20 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            ForgeTech<span className="text-brand-gold">Nobles</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-1">Set New Password</h2>
          <p className="text-neutral-slate text-sm mb-6">
            Enter your new password below.
          </p>

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* New password */}
            <div>
              <label className="block text-sm font-medium text-brand-deep mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition-shadow bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-slate hover:text-brand-deep"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-brand-deep mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition-shadow bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-slate hover:text-brand-deep"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-deep text-white py-3 rounded-xl font-semibold hover:bg-brand-navy transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating password...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} ForgeTech Nobles. All rights reserved.
        </p>
      </div>
    </div>
  );
}