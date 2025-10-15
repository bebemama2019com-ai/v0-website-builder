-- Documents Table
create table if not exists public.documents (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  file_url text not null,
  category text not null, -- 'normative' or 'budget'
  file_type text not null, -- 'pdf', 'doc', 'xls', etc.
  file_size integer, -- in bytes
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- For Parents Content Table
create table if not exists public.parent_content (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text not null,
  category text not null, -- 'daily_schedule', 'weekly_menu', 'council', 'forms'
  image_url text,
  file_url text, -- for downloadable forms/documents
  order_index integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.documents enable row level security;
alter table public.parent_content enable row level security;

-- Public read access
create policy "Anyone can view documents"
  on public.documents for select
  using (true);

create policy "Anyone can view published parent content"
  on public.parent_content for select
  using (published = true);

-- Admin-only write access for documents
create policy "Admins can insert documents"
  on public.documents for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update documents"
  on public.documents for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete documents"
  on public.documents for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Admin-only write access for parent content
create policy "Admins can insert parent content"
  on public.parent_content for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update parent content"
  on public.parent_content for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete parent content"
  on public.parent_content for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can view all parent content"
  on public.parent_content for select
  using (exists (select 1 from public.admin_users where id = auth.uid()) or published = true);

-- Create indexes
create index if not exists documents_category_idx on public.documents(category);
create index if not exists documents_order_idx on public.documents(order_index);
create index if not exists parent_content_category_idx on public.parent_content(category);
create index if not exists parent_content_slug_idx on public.parent_content(slug);
create index if not exists parent_content_order_idx on public.parent_content(order_index);

-- Create triggers for updated_at
create trigger documents_updated_at
  before update on public.documents
  for each row
  execute function public.handle_updated_at();

create trigger parent_content_updated_at
  before update on public.parent_content
  for each row
  execute function public.handle_updated_at();
