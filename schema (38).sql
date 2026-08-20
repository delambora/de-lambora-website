-- Run this once in Supabase: Project -> SQL Editor -> New query -> paste all -> Run

create extension if not exists "pgcrypto";

-- PRODUCTS ---------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  fabric text,
  fit text,
  origin text,
  category text,
  colors jsonb not null default '[]',   -- e.g. [{"name":"Ink","hex":"#1B1A17"}]
  sizes jsonb not null default '[]',    -- e.g. ["XS","S","M","L","XL"]
  image_bg text default '#3A342A',      -- placeholder swatch colour until real photos are added
  created_at timestamptz default now()
);

alter table products enable row level security;
create policy "Products are publicly readable" on products for select using (true);

-- ORDERS -------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text default 'pending', -- pending | paid | failed
  subtotal numeric not null,
  shipping numeric not null default 0,
  total numeric not null,
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  created_at timestamptz default now()
);

alter table orders enable row level security;
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on orders for insert with check (auth.uid() = user_id);

-- ORDER ITEMS ----------------------------------------------------------------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders on delete cascade not null,
  product_id uuid references products,
  product_name text not null,
  color text,
  size text,
  qty int not null,
  price numeric not null
);

alter table order_items enable row level security;
create policy "Users can view own order items" on order_items for select
  using (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
create policy "Users can insert own order items" on order_items for insert
  with check (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

-- SAMPLE PRODUCTS ------------------------------------------------------------
insert into products (name, slug, description, price, fabric, fit, origin, category, colors, sizes, image_bg) values
('The Ledger Shirt', 'the-ledger-shirt', 'A boxy, relaxed-fit shirt in mid-weight cotton poplin. Single chest pocket, horn buttons, side vents.', 3200, '100% cotton poplin', 'Relaxed tailored', 'Woven in Coimbatore', 'Shirts',
  '[{"name":"Ink","hex":"#1B1A17"},{"name":"Bone","hex":"#F1ECE2"},{"name":"Clay","hex":"#8B5E3C"}]', '["XS","S","M","L","XL"]', '#3A342A'),
('Field Trouser', 'field-trouser', 'Straight leg trouser in brushed cotton twill, built for movement.', 4200, '98% cotton, 2% elastane', 'Straight', 'Woven in Coimbatore', 'Trousers',
  '[{"name":"Charcoal","hex":"#2E2B26"},{"name":"Sand","hex":"#A79C86"}]', '["28","30","32","34","36"]', '#4A4139'),
('Atelier Overshirt', 'atelier-overshirt', 'Heavyweight cotton overshirt, layer-ready with a soft brushed hand.', 5600, '100% brushed cotton', 'Boxy oversized', 'Woven in Tirupur', 'Outerwear',
  '[{"name":"Clay","hex":"#5C4A3E"},{"name":"Ink","hex":"#1B1A17"}]', '["S","M","L","XL"]', '#5C4A3E'),
('Selvage Chino', 'selvage-chino', 'Slim tapered chino in Japanese selvage cotton.', 3800, '100% selvage cotton', 'Slim tapered', 'Woven in Coimbatore', 'Trousers',
  '[{"name":"Sand","hex":"#A79C86"},{"name":"Charcoal","hex":"#2E2B26"}]', '["28","30","32","34","36"]', '#3E3A2E')
on conflict (slug) do nothing;
