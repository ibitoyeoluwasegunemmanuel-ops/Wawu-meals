import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const PAYMENT_STATUSES = ["payment_received", "payment_not_received"];
const ORDER_STATUSES = ["order_received", "preparing", "cooking", "ready", "completed", "cancelled"];

/** Confirms the request carries a valid, signed-in vendor session. */
async function requireVendor(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;
  const db = supabaseServer();
  const { data, error } = await db.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export async function POST(req: NextRequest, { params }: { params: { orderNumber: string } }) {
  const user = await requireVendor(req);
  if (!user) {
    return NextResponse.json({ error: "Vendor sign-in required." }, { status: 401 });
  }

  const { paymentStatus, orderStatus } = await req.json();

  if (paymentStatus && !PAYMENT_STATUSES.includes(paymentStatus)) {
    return NextResponse.json({ error: "Invalid payment status." }, { status: 400 });
  }
  if (orderStatus && !ORDER_STATUSES.includes(orderStatus)) {
    return NextResponse.json({ error: "Invalid order status." }, { status: 400 });
  }

  try {
    const db = supabaseServer();
    const { data: order, error: findErr } = await db
      .from("orders")
      .select("id")
      .eq("order_number", params.orderNumber)
      .single();
    if (findErr || !order) throw findErr ?? new Error("Order not found");

    const patch: Record<string, string> = {};
    if (paymentStatus) patch.payment_status = paymentStatus;
    if (orderStatus) patch.order_status = orderStatus;

    const { error: updateErr } = await db.from("orders").update(patch).eq("id", order.id);
    if (updateErr) throw updateErr;

    await db.from("order_status_events").insert({
      order_id: order.id,
      payment_status: paymentStatus ?? null,
      order_status: orderStatus ?? null,
      note: `Updated by vendor (${user.email})`
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[orders:status]", err);
    return NextResponse.json({ error: "Could not update the order." }, { status: 500 });
  }
}
