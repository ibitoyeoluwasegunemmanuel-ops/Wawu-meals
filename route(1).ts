import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { notifyVendorPaymentSent } from "@/lib/whatsapp";

export async function POST(_req: NextRequest, { params }: { params: { orderNumber: string } }) {
  try {
    const db = supabaseServer();

    const { data: order, error: findErr } = await db
      .from("orders")
      .select("*, order_items(*)")
      .eq("order_number", params.orderNumber)
      .single();
    if (findErr || !order) throw findErr ?? new Error("Order not found");

    // IMPORTANT: this only ever moves the order to "payment_verification".
    // It never sets "payment_received" — only the vendor can do that,
    // manually, after checking the bank account.
    const { error: updateErr } = await db
      .from("orders")
      .update({ payment_status: "payment_verification" })
      .eq("id", order.id);
    if (updateErr) throw updateErr;

    await db.from("order_status_events").insert({
      order_id: order.id,
      payment_status: "payment_verification",
      note: "Customer tapped 'I've Made Payment'"
    });

    notifyVendorPaymentSent({
      id: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      phone: order.phone,
      tableOrLocation: order.table_or_location,
      items: order.order_items,
      total: order.total,
      paymentStatus: "payment_verification",
      orderStatus: order.order_status,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    } as any).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[orders:payment-sent]", err);
    return NextResponse.json({ error: "Could not update payment status." }, { status: 500 });
  }
}
