-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Team Members Table
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  bio text,
  image_url text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- News Posts Table
create table if not exists public.news_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  image_url text,
  category text not null,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery Images Table
create table if not exists public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text not null,
  category text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Admin Users Table (references auth.users)
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.team_members enable row level security;
alter table public.news_posts enable row level security;
alter table public.gallery_images enable row level security;
alter table public.admin_users enable row level security;

-- Public read access for all content tables
create policy "Anyone can view team members"
  on public.team_members for select
  using (true);

create policy "Anyone can view published news posts"
  on public.news_posts for select
  using (published = true);

create policy "Anyone can view gallery images"
  on public.gallery_images for select
  using (true);

-- Admin-only write access
create policy "Admins can insert team members"
  on public.team_members for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update team members"
  on public.team_members for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete team members"
  on public.team_members for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can insert news posts"
  on public.news_posts for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update news posts"
  on public.news_posts for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete news posts"
  on public.news_posts for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can view all news posts"
  on public.news_posts for select
  using (exists (select 1 from public.admin_users where id = auth.uid()) or published = true);

create policy "Admins can insert gallery images"
  on public.gallery_images for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update gallery images"
  on public.gallery_images for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete gallery images"
  on public.gallery_images for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Admin users policies
create policy "Admins can view admin users"
  on public.admin_users for select
  using (auth.uid() = id);

create policy "Admins can insert themselves"
  on public.admin_users for insert
  with check (auth.uid() = id);

-- Create indexes for better performance
create index if not exists team_members_order_idx on public.team_members(order_index);
create index if not exists news_posts_slug_idx on public.news_posts(slug);
create index if not exists news_posts_published_idx on public.news_posts(published, published_at desc);
create index if not exists gallery_images_category_idx on public.gallery_images(category);
create index if not exists gallery_images_order_idx on public.gallery_images(order_index);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger team_members_updated_at
  before update on public.team_members
  for each row
  execute function public.handle_updated_at();

create trigger news_posts_updated_at
  before update on public.news_posts
  for each row
  execute function public.handle_updated_at();

create trigger gallery_images_updated_at
  before update on public.gallery_images
  for each row
  execute function public.handle_updated_at();
