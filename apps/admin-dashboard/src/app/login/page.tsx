// apps/admin-dashboard/src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
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
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-brand-deep mb-1">
              Welcome back
            </h2>
            <p className="text-neutral-slate text-sm">
              Sign in to manage your website content.
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-brand-deep mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition-shadow bg-white"
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-neutral-border text-brand-tech focus:ring-brand-tech"
              />
              <span className="text-sm text-neutral-slate">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-brand-tech hover:underline"
            >
              Forgot password?
            </Link>
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
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} ForgeTech Nobles. All rights reserved.
        </p>
      </div>
    </div>
  );
}