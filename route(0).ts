import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(_req: NextRequest, { params }: { params: { orderNumber: string } }) {
  try {
    const db = supabaseServer();
    const { data, error } = await db
      .from("orders")
      .select("*, order_items(*)")
      .eq("order_number", params.orderNumber)
      .single();
    if (error) throw error;
    return NextResponse.json({ order: data });
  } catch (err: any) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
}
