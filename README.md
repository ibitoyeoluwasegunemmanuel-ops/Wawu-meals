# Wawu Meals — QR Menu & Ordering (MVP)

A mobile-first QR menu + manual-bank-transfer ordering system, built for Wawu Meals.
Customers scan a QR code → browse the bowl menu → add to cart → check out →
pay by bank transfer → track their order. The vendor runs everything from a
phone dashboard: confirm payment, move orders through preparing → cooking →
ready → completed.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth) — orders, menu, vendor login
- Deployed on Vercel

## 1. Install

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at supabase.com.
2. In the SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`
   (the seed file loads the full Wawu Meals bowls menu — rice, soups, pasta,
   stews & sauces, peppersoup, other dishes, and proteins — exactly as priced
   in the client's menu PDF).
3. Copy `.env.example` to `.env.local` and fill in the three Supabase values
   from Project Settings → API.
4. Create the vendor's login: Authentication → Users → **Add user** (email +
   password). That's the account used to sign in at `/vendor`.
5. In the vendor dashboard (`/vendor/qr` once logged in), fill in the real
   bank name, account name and account number — this is what customers see
   on the payment screen.

## 3. Run locally

```bash
npm run dev
```

- Customer menu: `http://localhost:3000`
- Vendor dashboard: `http://localhost:3000/vendor`

## 4. Deploy

Push to GitHub, import into Vercel, add the same environment variables from
`.env.local` in the Vercel project settings, deploy. Once live, open
`/vendor/qr` and set the "Ordering URL" to the production domain, then print
that QR code — it never needs to change, even if menu items or prices do.

## How the order flow works

```
QR code → menu → cart → checkout (name, phone, table/location) → order created
   → order page shows bank details → customer taps "I've Made Payment"
   → status becomes "Payment Verification" (nothing is auto-confirmed)
   → vendor checks their bank account manually
   → vendor taps CONFIRM PAYMENT in the dashboard
   → order moves: Preparing → Cooking → Ready → Completed
   → customer's order page updates automatically (polls every 8s)
```

Every order gets a permanent link at `/order/[orderNumber]` — that's what the
customer sees right after checkout, and can reopen anytime to check status.

## WhatsApp notifications

`lib/whatsapp.ts` is written so the rest of the app never needs to know
whether WhatsApp is connected — it's called on every new order and every
"payment sent," and quietly no-ops (logging to the server console) until you
add credentials. To turn it on:

1. Set up a Meta developer app with the WhatsApp product, get a permanent
   access token and phone_number_id.
2. Add `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and
   `WHATSAPP_VENDOR_NUMBER` to your environment.
3. Uncomment the `fetch()` call inside `sendWhatsAppMessage()` in
   `lib/whatsapp.ts`.

No other file changes. The database stays the source of truth regardless —
WhatsApp is a notification only, never where order state lives.

## Project structure

```
app/
  page.tsx                        customer menu + landing
  order/[orderNumber]/page.tsx    payment + order tracking
  vendor/page.tsx                 vendor login
  vendor/dashboard/page.tsx       vendor order management
  vendor/qr/page.tsx              QR code + bank details
  api/orders/...                  order create/read/status routes
  api/settings/route.ts           bank details read/write
components/                       SizeDial, MenuItemCard, CartDrawer, ...
lib/
  menu-data.ts                    menu content (source: client's PDF)
  types.ts                        shared types incl. the status flow
  cart-store.ts                   client-side cart (zustand + localStorage)
  whatsapp.ts                     notification service (see above)
  supabase/                       browser + server Supabase clients
supabase/
  schema.sql                      tables + Row Level Security
  seed.sql                        auto-generated from lib/menu-data.ts
```

## Notes on what's deliberately NOT in v1

No Paystack/Flutterwave, no wallets, no automatic payment verification, no
delivery tracking, no customer accounts, no mobile app. Payment confirmation
is a manual, deliberate action by the vendor — by design, so money is never
marked received until someone has actually checked the bank account.
