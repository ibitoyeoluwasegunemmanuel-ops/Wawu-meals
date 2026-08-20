import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { notifyVendorNewOrder } from "@/lib/whatsapp";
import { Order } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerName, phone, tableOrLocation, items } = body as {
    customerName: string;
    phone: string;
    tableOrLocation?: string;
    items: { itemId: string; itemName: string; size: string; unitPrice: number; quantity: number }[];
  };

  if (!customerName?.trim() || !phone?.trim() || !items?.length) {
    return NextResponse.json({ error: "Missing customer name, phone, or cart items." }, { status: 400 });
  }

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  try {
    const db = supabaseServer();

    const { data: orderNumberData, error: seqErr } = await db.rpc("next_order_number");
    if (seqErr) throw seqErr;
    const orderNumber = orderNumberData as string;

    const { data: orderRow, error: orderErr } = await db
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customerName.trim(),
        phone: phone.trim(),
        table_or_location: tableOrLocation?.trim() || null,
        subtotal: total,
        total
      })
      .select()
      .single();
    if (orderErr) throw orderErr;

    const { error: itemsErr } = await db.from("order_items").insert(
      items.map((i) => ({
        order_id: orderRow.id,
        menu_item_id: i.itemId,
        item_name: i.itemName,
        size_label: i.size,
        unit_price: i.unitPrice,
        quantity: i.quantity,
        line_total: i.unitPrice * i.quantity
      }))
    );
    if (itemsErr) throw itemsErr;

    const order: Order = {
      id: orderRow.id,
      orderNumber: orderRow.order_number,
      customerName: orderRow.customer_name,
      phone: orderRow.phone,
      tableOrLocation: orderRow.table_or_location,
      items: items.map((i) => ({
        lineId: i.itemId + i.size,
        itemId: i.itemId,
        itemName: i.itemName,
        categoryName: "",
        size: i.size as any,
        unitPrice: i.unitPrice,
        quantity: i.quantity
      })),
      total: orderRow.total,
      paymentStatus: orderRow.payment_status,
      orderStatus: orderRow.order_status,
      createdAt: orderRow.created_at,
      updatedAt: orderRow.updated_at
    };

    // Fire-and-forget — never let a WhatsApp hiccup block order creation.
    notifyVendorNewOrder(order).catch(() => {});

    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (err: any) {
    console.error("[orders:create]", err);
    return NextResponse.json(
      { error: "Could not place the order. " + (err?.message ?? "") },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Order lists include customer names and phone numbers — vendor-only.
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const db = supabaseServer();
  const { data: userData, error: authErr } = await db.auth.getUser(token);
  if (authErr || !userData?.user) {
    return NextResponse.json({ error: "Vendor sign-in required." }, { status: 401 });
  }

  try {
    const { data, error } = await db
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return NextResponse.json({ orders: data });
  } catch (err: any) {
    console.error("[orders:list]", err);
    return NextResponse.json({ error: err?.message ?? "Failed to load orders." }, { status: 500 });
  }
}
