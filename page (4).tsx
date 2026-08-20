"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorSession, authedFetch } from "@/lib/use-vendor-session";
import { supabaseBrowser } from "@/lib/supabase/client";
import { formatNaira } from "@/lib/cart-store";
import { OrderStatus, PaymentStatus } from "@/lib/types";

interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  table_or_location: string | null;
  total: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  created_at: string;
  order_items: { item_name: string; size_label: string; quantity: number; line_total: number }[];
}

const FILTERS: { key: string; label: string; test: (o: OrderRow) => boolean }[] = [
  { key: "all", label: "All", test: () => true },
  { key: "awaiting_transfer", label: "Awaiting Payment", test: (o) => o.payment_status === "awaiting_transfer" },
  { key: "payment_verification", label: "Payment Verification", test: (o) => o.payment_status === "payment_verification" },
  { key: "preparing", label: "Preparing", test: (o) => o.order_status === "preparing" },
  { key: "cooking", label: "Cooking", test: (o) => o.order_status === "cooking" },
  { key: "ready", label: "Ready", test: (o) => o.order_status === "ready" },
  { key: "completed", label: "Completed", test: (o) => o.order_status === "completed" },
  { key: "cancelled", label: "Cancelled", test: (o) => o.order_status === "cancelled" }
];

const NEXT_ORDER_STEP: Partial<Record<OrderStatus, { next: OrderStatus; label: string }>> = {
  order_received: { next: "preparing", label: "START PREPARING" },
  preparing: { next: "cooking", label: "START COOKING" },
  cooking: { next: "ready", label: "MARK READY" },
  ready: { next: "completed", label: "MARK COMPLETED" }
};

export default function VendorDashboard() {
  const router = useRouter();
  const { session, loading } = useVendorSession();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await authedFetch("/api/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders ?? []);
    }
  }, []);

  useEffect(() => {
    if (!loading && !session) router.replace("/vendor");
  }, [loading, session, router]);

  useEffect(() => {
    if (!session) return;
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [session, load]);

  async function updateStatus(orderNumber: string, patch: { paymentStatus?: string; orderStatus?: string }) {
    setBusyId(orderNumber);
    await authedFetch(`/api/orders/${orderNumber}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    await load();
    setBusyId(null);
  }

  if (loading || !session) return null;

  const visible = orders.filter(FILTERS.find((f) => f.key === filter)!.test);

  return (
    <main className="min-h-screen bg-char-950 pb-10">
      <header className="sticky top-0 z-10 bg-char-950 border-b border-char-700 px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-wide">Orders</h1>
        <div className="flex items-center gap-3">
          <a href="/vendor/qr" className="text-sm text-plate/60 underline">
            QR code
          </a>
          <button
            onClick={() => supabaseBrowser.auth.signOut()}
            className="text-sm text-plate/60 underline"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-pill px-4 py-2 text-sm font-display tracking-wide border ${
              filter === f.key
                ? "bg-pepper-500 border-pepper-500 text-plate"
                : "border-char-700 text-plate/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-4 mt-2">
        {visible.length === 0 && (
          <p className="text-center text-plate/40 py-16">No orders here right now.</p>
        )}

        {visible.map((o) => (
          <article key={o.id} className="bg-char-800 rounded-card p-4 border border-char-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-2xl tracking-wide">#{o.order_number}</p>
                <p className="text-plate/70">{o.customer_name}</p>
                <p className="text-sm text-plate/40">
                  {o.phone}
                  {o.table_or_location ? ` · ${o.table_or_location}` : ""}
                </p>
              </div>
              <span className="text-xs uppercase tracking-wide text-plate/40">
                {new Date(o.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <ul className="mt-3 text-sm space-y-1">
              {o.order_items.map((i, idx) => (
                <li key={idx} className="flex justify-between gap-3 text-plate/80">
                  <span>
                    {i.quantity} × {i.item_name} ({i.size_label})
                  </span>
                  <span className="tabular-nums">{formatNaira(i.line_total)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-char-700">
              <span className="font-display text-xl tabular-nums text-gold-400">
                {formatNaira(o.total)}
              </span>
              <StatusBadge order={o} />
            </div>

            {/* Actions */}
            <div className="mt-3 space-y-2">
              {o.payment_status === "payment_verification" && (
                <div className="flex gap-2">
                  <button
                    disabled={busyId === o.order_number}
                    onClick={() => updateStatus(o.order_number, { paymentStatus: "payment_received" })}
                    className="flex-1 rounded-xl bg-gold-500 text-ink py-4 font-display text-lg tracking-wide disabled:opacity-50"
                  >
                    CONFIRM PAYMENT
                  </button>
                  <button
                    disabled={busyId === o.order_number}
                    onClick={() => updateStatus(o.order_number, { paymentStatus: "payment_not_received" })}
                    className="flex-1 rounded-xl border border-pepper-500 text-pepper-400 py-4 font-display text-lg tracking-wide disabled:opacity-50"
                  >
                    NOT RECEIVED
                  </button>
                </div>
              )}

              {o.payment_status === "payment_not_received" && (
                <button
                  disabled={busyId === o.order_number}
                  onClick={() => updateStatus(o.order_number, { paymentStatus: "payment_received" })}
                  className="w-full rounded-xl bg-gold-500 text-ink py-4 font-display text-lg tracking-wide disabled:opacity-50"
                >
                  CONFIRM PAYMENT
                </button>
              )}

              {o.payment_status === "payment_received" &&
                o.order_status !== "completed" &&
                o.order_status !== "cancelled" &&
                NEXT_ORDER_STEP[o.order_status] && (
                  <button
                    disabled={busyId === o.order_number}
                    onClick={() =>
                      updateStatus(o.order_number, { orderStatus: NEXT_ORDER_STEP[o.order_status]!.next })
                    }
                    className="w-full rounded-xl bg-pepper-500 py-4 font-display text-lg tracking-wide disabled:opacity-50"
                  >
                    {NEXT_ORDER_STEP[o.order_status]!.label}
                  </button>
                )}

              {o.order_status !== "completed" && o.order_status !== "cancelled" && (
                <button
                  disabled={busyId === o.order_number}
                  onClick={() => updateStatus(o.order_number, { orderStatus: "cancelled" })}
                  className="w-full text-center text-sm text-plate/40 underline py-1"
                >
                  Cancel order
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function StatusBadge({ order }: { order: OrderRow }) {
  const label =
    order.payment_status === "awaiting_transfer"
      ? "Awaiting Transfer"
      : order.payment_status === "payment_verification"
      ? "Verifying Payment"
      : order.payment_status === "payment_not_received"
      ? "Payment Not Found"
      : order.order_status === "order_received"
      ? "Paid — Not Started"
      : order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1);

  return <span className="text-xs uppercase tracking-wide text-plate/50">{label}</span>;
}
