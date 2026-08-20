import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const db = supabaseServer();
    const { data, error } = await db.from("vendor_settings").select("*").eq("id", 1).single();
    if (error) throw error;
    return NextResponse.json({ settings: data });
  } catch (err: any) {
    return NextResponse.json({ error: "Could not load settings." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const db = supabaseServer();
  const { data: userData, error: authErr } = await db.auth.getUser(token);
  if (authErr || !userData?.user) {
    return NextResponse.json({ error: "Vendor sign-in required." }, { status: 401 });
  }

  const { bankName, accountName, accountNumber, orderingUrl } = await req.json();

  try {
    const { error } = await db
      .from("vendor_settings")
      .update({
        bank_name: bankName,
        account_name: accountName,
        account_number: accountNumber,
        ordering_url: orderingUrl
      })
      .eq("id", 1);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Could not save settings." }, { status: 500 });
  }
}
