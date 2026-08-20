"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useVendorSession } from "@/lib/use-vendor-session";

export default function VendorLoginPage() {
  const router = useRouter();
  const { session, loading } = useVendorSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session) router.replace("/vendor/dashboard");
  }, [session, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/vendor/dashboard");
  }

  if (loading) return null;

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div className="text-center mb-6">
          <p className="font-display text-pepper-500 tracking-[0.3em] text-sm">WAWU MEALS</p>
          <h1 className="font-display text-3xl tracking-wide mt-1">Vendor Sign In</h1>
        </div>
        <label className="block">
          <span className="text-sm text-plate/60">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-3 text-plate"
          />
        </label>
        <label className="block">
          <span className="text-sm text-plate/60">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-3 text-plate"
          />
        </label>
        {error && <p className="text-pepper-400 text-sm">{error}</p>}
        <button
          disabled={submitting}
          className="w-full rounded-pill bg-pepper-500 py-3.5 font-display text-lg tracking-wide disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-xs text-plate/40 text-center">
          Vendor accounts are created in the Supabase dashboard — see the README.
        </p>
      </form>
    </main>
  );
}
