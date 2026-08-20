"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, formatNaira } from "@/lib/cart-store";

export function CartDrawer() {
  const router = useRouter();
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);

  const [step, setStep] = useState<"cart" | "details">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableOrLocation, setTableOrLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function placeOrder() {
    setError(null);
    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          tableOrLocation,
          items: lines.map((l) => ({
            itemId: l.itemId,
            itemName: l.itemName,
            size: l.size,
            unitPrice: l.unitPrice,
            quantity: l.quantity
          }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      clear();
      close();
      router.push(`/order/${data.orderNumber}`);
    } catch (e: any) {
      setError(e.message ?? "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button aria-label="Close cart" className="absolute inset-0 bg-black/60" onClick={close} />

      <div className="relative bg-char-800 rounded-t-card max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-char-700">
          <h2 className="font-display text-2xl tracking-wide">
            {step === "cart" ? "Your Cart" : "Your Details"}
          </h2>
          <button onClick={close} className="text-plate/60 text-2xl leading-none px-2">
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 flex-1">
          {step === "cart" ? (
            lines.length === 0 ? (
              <p className="text-plate/60 py-8 text-center">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {lines.map((l) => (
                  <li key={l.lineId} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg tracking-wide truncate">{l.itemName}</p>
                      <p className="text-sm text-plate/50">
                        {l.size} · {formatNaira(l.unitPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(l.lineId, l.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-char-700 grid place-items-center text-plate/80"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums">{l.quantity}</span>
                      <button
                        onClick={() => setQuantity(l.lineId, l.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-char-700 grid place-items-center text-plate/80"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-plate/60">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-char-900 border border-char-700 px-3 py-2.5 text-plate placeholder:text-plate/30"
                  placeholder="e.g. Emmanuel"
                />
              </label>
              <label className="block">
                <span className="text-sm text-plate/60">Phone number</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="mt-1 w-full rounded-lg bg-char-900 border border-char-700 px-3 py-2.5 text-plate placeholder:text-plate/30"
                  placeholder="080…"
                />
              </label>
              <label className="block">
                <span className="text-sm text-plate/60">Table number / location (optional)</span>
                <input
                  value={tableOrLocation}
                  onChange={(e) => setTableOrLocation(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-char-900 border border-char-700 px-3 py-2.5 text-plate placeholder:text-plate/30"
                  placeholder="Table 12"
                />
              </label>
              {error && <p className="text-pepper-400 text-sm">{error}</p>}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-char-700 dash-divider">
          <div className="flex items-center justify-between mb-3">
            <span className="text-plate/60">Total</span>
            <span className="font-display text-2xl text-gold-400 tabular-nums">
              {formatNaira(total)}
            </span>
          </div>
          {step === "cart" ? (
            <button
              disabled={lines.length === 0}
              onClick={() => setStep("details")}
              className="w-full rounded-pill bg-pepper-500 py-3.5 font-display text-lg tracking-wide disabled:opacity-40"
            >
              Checkout
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setStep("cart")}
                className="rounded-pill border border-char-700 px-5 py-3.5 font-display tracking-wide text-plate/70"
              >
                Back
              </button>
              <button
                onClick={placeOrder}
                disabled={submitting}
                className="flex-1 rounded-pill bg-pepper-500 py-3.5 font-display text-lg tracking-wide disabled:opacity-60"
              >
                {submitting ? "Placing Order…" : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
