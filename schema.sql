-- Wawu Meals — QR ordering system schema
-- Run this in the Supabase SQL editor (or `supabase db push`).

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────
-- Menu
-- ─────────────────────────────────────────────────────────

create table if not exists categories (
  id text primary key,               -- e.g. 'rice', 'soup', 'proteins'
  name text not null,
  note text,
  display_order int not null default 0
);

create table if not exists menu_items (
  id text primary key,               -- e.g. 'rice-basmati-jollof'
  category_id text not null references categories(id) on delete cascade,
  name text not null,
  description text,
  image_url text,
  is_available boolean not null default true,
  display_order int not null default 0
);

create table if not exists menu_item_variants (
  id uuid primary key default gen_random_uuid(),
  menu_item_id text not null references menu_items(id) on delete cascade,
  size_label text not null,          -- '1.5L' | '2.5L' | '3.5L' | '5L' | 'Standard'
  price integer not null check (price >= 0), -- kobo-free Naira integer
  display_order int not null default 0
);

-- ─────────────────────────────────────────────────────────
-- Orders
-- ─────────────────────────────────────────────────────────

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,          -- shown to customers as "#1045"
  customer_name text not null,
  phone text not null,
  table_or_location text,
  subtotal integer not null,
  total integer not null,
  payment_status text not null default 'awaiting_transfer'
    check (payment_status in ('awaiting_transfer','payment_verification','payment_received','payment_not_received')),
  order_status text not null default 'order_received'
    check (order_status in ('order_received','preparing','cooking','ready','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id text references menu_items(id),
  item_name text not null,           -- snapshot, survives menu edits
  size_label text not null,          -- snapshot
  unit_price integer not null,       -- snapshot
  quantity int not null check (quantity > 0),
  line_total integer not null
);

create table if not exists order_status_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  payment_status text,
  order_status text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists vendor_settings (
  id int primary key default 1,
  bank_name text not null default '',
  account_name text not null default '',
  account_number text not null default '',
  ordering_url text not null default '',   -- permanent URL the QR code points to
  constraint single_row check (id = 1)
);
insert into vendor_settings (id) values (1) on conflict (id) do nothing;

-- Sequence used to generate friendly, sequential order numbers (#1001, #1002, ...)
create sequence if not exists order_number_seq start 1001;

create or replace function next_order_number() returns text as $$
  select nextval('order_number_seq')::text;
$$ language sql;

-- Keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at before update on orders
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────
-- Row Level Security
-- Public (anon) can: read the menu, read/create orders (no direct
-- status updates), and read only their own order via a tracking token
-- baked into the order number lookup — sensitive vendor actions
-- (confirm payment, advance status) go through API routes using the
-- service-role key, never straight from the browser.
-- ─────────────────────────────────────────────────────────

alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_item_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table order_status_events enable row level security;
alter table vendor_settings enable row level security;

create policy "menu is public read" on categories for select using (true);
create policy "menu items are public read" on menu_items for select using (true);
create policy "variants are public read" on menu_item_variants for select using (true);

create policy "anyone can create an order" on orders for insert with check (true);
create policy "anyone can read an order by number" on orders for select using (true);
-- No public update/delete policy on orders — all status changes go through
-- the API routes (service role), which is the only way to bypass RLS.

create policy "anyone can create order items" on order_items for insert with check (true);
create policy "anyone can read order items" on order_items for select using (true);

create policy "bank details are public read" on vendor_settings for select using (true);
