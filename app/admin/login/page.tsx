"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-bone px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl font-semibold tracking-tight text-deep-charcoal">
            Law Firm
          </p>
          <p className="mt-1 font-sans text-sm text-deep-charcoal/50">Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-deep-charcoal/[0.08] bg-white p-8 shadow-premium"
        >
          <h1 className="font-serif text-xl font-semibold tracking-tight text-deep-charcoal">
            Sign in
          </h1>
          <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
            Admin access only
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/70">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/70">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 font-sans text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-deep-charcoal px-4 py-3 font-sans text-sm font-medium tracking-wide text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
