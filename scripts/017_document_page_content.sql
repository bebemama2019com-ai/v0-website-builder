-- Admin-edited header text for the /documents/* pages.
-- A row overrides the default text in lib/document-pages.ts; no row = default text.
-- Fields may contain **bold**, *italic* and line breaks.

create table if not exists public.document_page_content (
  page_key text primary key,
  order_info text not null,
  order_details text not null,
  approved_by text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.document_page_content enable row level security;

create policy "Anyone can view document page content" on public.document_page_content
  for select to anon, authenticated
  using (true);

create policy "Admins can insert document page content" on public.document_page_content
  for insert to authenticated
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "Admins can update document page content" on public.document_page_content
  for update to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "Admins can delete document page content" on public.document_page_content
  for delete to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()));
