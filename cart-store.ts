"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: Omit<CartLine, "quantity">, qty?: number) => void;
  setQuantity: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addLine: (line, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.lineId === line.lineId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.lineId === line.lineId ? { ...l, quantity: l.quantity + qty } : l
              )
            };
          }
          return { lines: [...state.lines, { ...line, quantity: qty }] };
        }),
      setQuantity: (lineId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.lineId !== lineId)
              : state.lines.map((l) => (l.lineId === lineId ? { ...l, quantity: qty } : l))
        })),
      removeLine: (lineId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.lineId !== lineId) })),
      clear: () => set({ lines: [] }),
      total: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0)
    }),
    { name: "wawu-cart" }
  )
);

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}
