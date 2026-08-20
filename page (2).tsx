"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useVendorSession, authedFetch } from "@/lib/use-vendor-session";

export default function VendorQrPage() {
  const router = useRouter();
  const { session, loading } = useVendorSession();
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [orderingUrl, setOrderingUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !session) router.replace("/vendor");
  }, [loading, session, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && !orderingUrl) {
      setOrderingUrl(window.location.origin);
    }
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (!d.settings) return;
        setBankName(d.settings.bank_name ?? "");
        setAccountName(d.settings.account_name ?? "");
        setAccountNumber(d.settings.account_number ?? "");
        if (d.settings.ordering_url) setOrderingUrl(d.settings.ordering_url);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await authedFetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bankName, accountName, accountNumber, orderingUrl })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading || !session) return null;

  return (
    <main className="min-h-screen px-4 py-8 max-w-md mx-auto space-y-8">
      <a href="/vendor/dashboard" className="text-sm text-plate/50 underline">
        ← Back to orders
      </a>

      <section className="bg-plate text-ink rounded-card p-6 text-center">
        <p className="font-display text-sm tracking-widest text-pepper-600">SCAN TO ORDER</p>
        <div className="mt-4 flex justify-center">
          <QRCodeSVG value={orderingUrl || "https://example.com"} size={220} fgColor="#1A1512" />
        </div>
        <p className="mt-3 text-xs text-ink/50 break-all">{orderingUrl}</p>
        <p className="mt-2 text-xs text-ink/40">
          This QR always points to this same web address — print it once, put it on stickers,
          table cards or posters. It stays valid even after you edit the menu or prices.
        </p>
      </section>

      <form onSubmit={save} className="space-y-4">
        <h2 className="font-display text-xl tracking-wide">Payment Details</h2>
        <p className="text-sm text-plate/50">
          Shown to customers on their order page after checkout.
        </p>
        <label className="block">
          <span className="text-sm text-plate/60">Bank name</span>
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-2.5"
          />
        </label>
        <label className="block">
          <span className="text-sm text-plate/60">Account name</span>
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-2.5"
          />
        </label>
        <label className="block">
          <span className="text-sm text-plate/60">Account number</span>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-2.5"
          />
        </label>
        <label className="block">
          <span className="text-sm text-plate/60">Ordering URL (what the QR points to)</span>
          <input
            value={orderingUrl}
            onChange={(e) => setOrderingUrl(e.target.value)}
            className="mt-1 w-full rounded-lg bg-char-800 border border-char-700 px-3 py-2.5"
          />
        </label>
        <button
          disabled={saving}
          className="w-full rounded-pill bg-pepper-500 py-3.5 font-display text-lg tracking-wide disabled:opacity-60"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </form>
    </main>
  );
}
