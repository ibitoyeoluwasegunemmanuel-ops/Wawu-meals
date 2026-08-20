"use client";

import { useCart, formatNaira } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export function CartBar() {
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());
  const total = useCart((s) => s.total());
  const open = useCart((s) => s.open);

  // Avoid hydration mismatch: cart is persisted client-side only.
  useEffect(() => setMounted(true), []);
  if (!mounted || count === 0) return null;

  return (
    <button
      onClick={open}
      className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between rounded-pill bg-pepper-500 px-5 py-4 shadow-plate text-plate"
    >
      <span className="font-display text-lg tracking-wide">
        {count} item{count > 1 ? "s" : ""} · View Cart
      </span>
      <span className="font-display text-xl tabular-nums">{formatNaira(total)}</span>
    </button>
  );
}
