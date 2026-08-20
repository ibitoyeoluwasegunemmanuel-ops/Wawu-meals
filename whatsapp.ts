import { Order } from "./types";
import { formatNaira } from "./cart-store";

/**
 * WhatsApp notifications — designed so the rest of the app never has to
 * know whether WhatsApp is actually connected. Every call site just calls
 * notifyVendorNewOrder(order) / notifyVendorPaymentSent(order) and this
 * module quietly no-ops (and logs) until real credentials are added.
 *
 * The database is always the source of truth — this is a side-effect
 * only, and it must never be allowed to throw and break order creation.
 *
 * TO CONNECT LATER (WhatsApp Cloud API — Meta):
 *   1. Create a Meta developer app + WhatsApp product, get a permanent
 *      access token and a phone_number_id.
 *   2. Set env vars: WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID,
 *      WHATSAPP_VENDOR_NUMBER (the vendor's own WhatsApp number, E.164).
 *   3. Uncomment the fetch() call in sendWhatsAppMessage() below.
 *   That's it — no other file in the app needs to change.
 */

function isConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_VENDOR_NUMBER
  );
}

async function sendWhatsAppMessage(body: string) {
  if (!isConfigured()) {
    // Not connected yet — MVP must keep working without WhatsApp.
    console.log("[whatsapp:not-configured] Would have sent:\n" + body);
    return { sent: false, reason: "not_configured" as const };
  }

  try {
    // --- Uncomment once WHATSAPP_* env vars are set ---
    // const res = await fetch(
    //   `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       messaging_product: "whatsapp",
    //       to: process.env.WHATSAPP_VENDOR_NUMBER,
    //       type: "text",
    //       text: { body }
    //     })
    //   }
    // );
    // if (!res.ok) throw new Error(await res.text());
    return { sent: true };
  } catch (err) {
    console.error("[whatsapp:send-failed]", err);
    return { sent: false, reason: "send_failed" as const };
  }
}

export async function notifyVendorNewOrder(order: Order) {
  const lines = order.items
    .map((i) => `${i.quantity} × ${i.itemName} (${i.size}) — ${formatNaira(i.unitPrice * i.quantity)}`)
    .join("\n");

  const body = [
    `NEW ORDER #${order.orderNumber}`,
    "",
    `Customer: ${order.customerName}`,
    order.tableOrLocation ? `Table/Location: ${order.tableOrLocation}` : null,
    "",
    lines,
    "",
    `Total: ${formatNaira(order.total)}`,
    "",
    "Payment: Awaiting Transfer"
  ]
    .filter(Boolean)
    .join("\n");

  return sendWhatsAppMessage(body);
}

export async function notifyVendorPaymentSent(order: Order) {
  const body = [
    `PAYMENT SENT — ORDER #${order.orderNumber}`,
    "",
    `${order.customerName} says they've transferred ${formatNaira(order.total)}.`,
    "Please check your bank account and confirm in the vendor dashboard."
  ].join("\n");

  return sendWhatsAppMessage(body);
}
