"use client";

import { useEffect, useState, useCallback } from "react";
import { formatNaira } from "@/lib/cart-store";
import { ORDER_STEPS, PaymentStatus, OrderStatus } from "@/lib/types";

interface OrderData {
  order_number: string;
  customer_name: string;
  table_or_location: string | null;
  total: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  order_items: { item_name: string; size_label: string; quantity: number; line_total: number }[];
}

interface Settings {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export default function OrderPage({ params }: { params: { orderNumber: string } }) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingPaid, setMarkingPaid] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = useCallback(async () => {
    const res = await fetch(`/api/orders/${params.orderNumber}`, { cache: "no-store" });
    if (!res.ok) {
      setNotFound(true);
      return;
    }
    const data = await res.json();
    setOrder(data.order);
  }, [params.orderNumber]);

  useEffect(() => {
    fetchOrder().finally(() => setLoading(false));
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings))
      .catch(() => {});

    // Poll so the customer sees vendor updates (payment confirmed, cooking,
    // ready, etc.) without needing to refresh.
    const interval = setInterval(fetchOrder, 8000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  async function markPaymentSent() {
    setMarkingPaid(true);
    try {
      await fetch(`/api/orders/${params.orderNumber}/payment-sent`, { method: "POST" });
      await fetchOrder();
    } finally {
      setMarkingPaid(false);
    }
  }

  if (loading) {
    return <main className="min-h-screen grid place-items-center text-plate/50">Loading…</main>;
  }
  if (notFound || !order) {
    return (
      <main className="min-h-screen grid place-items-center text-center px-6">
        <p className="font-display text-2xl">Order not found</p>
        <p className="text-plate/50 mt-2 text-sm">Double-check the link, or place a new order.</p>
      </main>
    );
  }

  const currentStepIndex = ORDER_STEPS.findIndex((s) => s.key === order.order_status);

  return (
    <main className="min-h-screen px-4 py-10 max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-plate/50 text-sm tracking-widest">ORDER</p>
        <h1 className="font-display text-5xl tracking-wide text-pepper-500">
          #{order.order_number}
        </h1>
      </div>

      {/* Receipt card */}
      <div className="receipt-card p-5 pt-6">
        <p className="font-display text-lg">{order.customer_name}</p>
        {order.table_or_location && (
          <p className="text-sm text-ink/50">{order.table_or_location}</p>
        )}
        <ul className="mt-3 space-y-1.5 text-sm">
          {order.order_items.map((i, idx) => (
            <li key={idx} className="flex justify-between gap-3">
              <span>
                {i.quantity} × {i.item_name} ({i.size_label})
              </span>
              <span className="tabular-nums">{formatNaira(i.line_total)}</span>
            </li>
          ))}
        </ul>
        <div className="dash-divider mt-3 pt-3 flex justify-between font-display text-xl">
          <span>Total</span>
          <span className="tabular-nums">{formatNaira(order.total)}</span>
        </div>
      </div>

      {/* Payment section */}
      {order.payment_status === "awaiting_transfer" && settings && (
        <div className="rounded-card border border-char-700 p-5 space-y-3">
          <h2 className="font-display text-xl tracking-wide text-gold-400">Payment Details</h2>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between">
              <dt className="text-plate/50">Bank</dt>
              <dd>{settings.bank_name || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-plate/50">Account Name</dt>
              <dd>{settings.account_name || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-plate/50">Account Number</dt>
              <dd className="tabular-nums">{settings.account_number || "—"}</dd>
            </div>
          </dl>
          <p className="text-sm text-plate/60">
            Please transfer exactly {formatNaira(order.total)} to the account above, then tap the
            button below.
          </p>
          <button
            onClick={markPaymentSent}
            disabled={markingPaid}
            className="w-full rounded-pill bg-pepper-500 py-3.5 font-display text-lg tracking-wide disabled:opacity-60"
          >
            {markingPaid ? "Updating…" : "I've Made Payment"}
          </button>
        </div>
      )}

      {order.payment_status === "payment_verification" && (
        <div className="rounded-card border border-gold-500/50 bg-gold-500/10 p-5 text-center">
          <p className="font-display text-lg text-gold-400">Payment Verification</p>
          <p className="text-sm text-plate/60 mt-1">
            We've noted your payment and are confirming it against our bank account. This page
            will update automatically once confirmed.
          </p>
        </div>
      )}

      {order.payment_status === "payment_not_received" && (
        <div className="rounded-card border border-pepper-500/50 bg-pepper-500/10 p-5 text-center">
          <p className="font-display text-lg text-pepper-400">Payment Not Found Yet</p>
          <p className="text-sm text-plate/60 mt-1">
            We couldn't find your transfer. If you've already paid, please contact us with your
            payment receipt — otherwise you can try transferring again.
          </p>
        </div>
      )}

      {/* Tracking stepper — only meaningful once payment is confirmed */}
      {order.payment_status === "payment_received" && (
        <div className="rounded-card border border-char-700 p-5">
          <h2 className="font-display text-xl tracking-wide mb-4">Order Status</h2>
          <ol className="space-y-3">
            {ORDER_STEPS.map((step, idx) => {
              const done = idx <= currentStepIndex;
              return (
                <li key={step.key} className="flex items-center gap-3">
                  <span className="step-dot" data-done={done}>
                    {done ? "✓" : ""}
                  </span>
                  <span className={done ? "text-plate" : "text-plate/40"}>{step.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {order.order_status === "cancelled" && (
        <div className="rounded-card border border-pepper-500/50 bg-pepper-500/10 p-5 text-center">
          <p className="font-display text-lg text-pepper-400">Order Cancelled</p>
        </div>
      )}

      <p className="text-center text-xs text-plate/30">
        Bookmark this page — you can reopen it anytime to check your order.
      </p>
    </main>
  );
}
