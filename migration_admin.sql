-- Run this once in Supabase: Project -> SQL Editor -> New query -> paste all -> Run
-- Adds what the admin panel needs: multi-image support, stock, and a storage
-- bucket to hold your real product photos.

alter table products add column if not exists images jsonb not null default '[]';
alter table products add column if not exists stock int not null default 100;

-- Public bucket so product photos can be shown on the site without extra setup.
-- Public means anyone can VIEW files in it (like any normal product photo would
-- be) — but only your admin panel (using the service_role key, never exposed
-- to visitors) can upload, edit, or delete files in it.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
