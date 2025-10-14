-- Complete Database Setup for Kindergarten CMS
-- Run this script in your Supabase SQL Editor

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

-- Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Anyone can view team members" on public.team_members;
drop policy if exists "Anyone can view published news posts" on public.news_posts;
drop policy if exists "Anyone can view gallery images" on public.gallery_images;
drop policy if exists "Admins can insert team members" on public.team_members;
drop policy if exists "Admins can update team members" on public.team_members;
drop policy if exists "Admins can delete team members" on public.team_members;
drop policy if exists "Admins can insert news posts" on public.news_posts;
drop policy if exists "Admins can update news posts" on public.news_posts;
drop policy if exists "Admins can delete news posts" on public.news_posts;
drop policy if exists "Admins can view all news posts" on public.news_posts;
drop policy if exists "Admins can insert gallery images" on public.gallery_images;
drop policy if exists "Admins can update gallery images" on public.gallery_images;
drop policy if exists "Admins can delete gallery images" on public.gallery_images;
drop policy if exists "Admins can view admin users" on public.admin_users;
drop policy if exists "Admins can insert themselves" on public.admin_users;

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

-- Drop existing triggers if they exist
drop trigger if exists team_members_updated_at on public.team_members;
drop trigger if exists news_posts_updated_at on public.news_posts;
drop trigger if exists gallery_images_updated_at on public.gallery_images;

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

-- Insert sample team members
insert into public.team_members (name, role, bio, image_url, order_index) values
  ('Maria Petrova', 'Director', 'With over 15 years of experience in early childhood education, Maria leads our team with passion and dedication.', '/teacher-portrait-1.jpg', 1),
  ('Elena Dimitrova', 'Lead Teacher', 'Elena specializes in creative arts and brings joy to every classroom activity.', '/teacher-portrait-2.jpg', 2),
  ('Ivan Georgiev', 'Music Teacher', 'Ivan introduces children to the wonderful world of music through fun and interactive lessons.', '/teacher-portrait-3.jpg', 3),
  ('Sofia Ivanova', 'English Teacher', 'Sofia makes learning English fun with games, songs, and storytelling.', '/teacher-portrait-4.jpg', 4),
  ('Dimitar Petrov', 'Physical Education', 'Dimitar keeps our little ones active and healthy with engaging sports activities.', '/teacher-portrait-5.jpg', 5),
  ('Ana Nikolova', 'Assistant Teacher', 'Ana provides loving care and support to help every child feel safe and happy.', '/teacher-portrait-6.jpg', 6)
on conflict do nothing;

-- Insert sample news posts
insert into public.news_posts (title, slug, excerpt, content, image_url, category, published, published_at) values
  (
    'Welcome to the New School Year!',
    'welcome-new-school-year',
    'We are excited to welcome all our students back for another amazing year of learning and growth.',
    'We are thrilled to announce the start of our new school year! Our teachers have prepared exciting new activities and learning experiences for all our students. We look forward to seeing familiar faces and welcoming new families to our kindergarten community.',
    '/news-school-year.jpg',
    'Announcement',
    true,
    now() - interval '10 days'
  ),
  (
    'Fall Festival Coming Soon',
    'fall-festival-coming-soon',
    'Join us for our annual Fall Festival with games, activities, and fun for the whole family!',
    'Mark your calendars! Our annual Fall Festival is coming up next month. There will be games, face painting, a costume parade, and delicious treats. This is a wonderful opportunity for families to come together and celebrate the season.',
    '/news-fall-festival.jpg',
    'Event',
    true,
    now() - interval '5 days'
  ),
  (
    'New Art Studio Opening',
    'new-art-studio-opening',
    'We are proud to announce the opening of our brand new art studio equipped with the latest materials.',
    'Our new art studio is now open! Children will have access to a wide variety of art supplies and materials to explore their creativity. The studio features child-sized easels, a pottery corner, and plenty of space for messy, creative fun.',
    '/news-art-studio.jpg',
    'News',
    true,
    now() - interval '15 days'
  )
on conflict (slug) do nothing;

-- Insert sample gallery images
insert into public.gallery_images (title, description, image_url, category, order_index) values
  ('Art Class Fun', 'Children enjoying creative art activities', '/gallery-art-class.jpg', 'Activities', 1),
  ('Outdoor Playtime', 'Playing in our beautiful outdoor playground', '/gallery-outdoor.jpg', 'Outdoor Play', 2),
  ('Story Time', 'Gathering for an exciting story', '/gallery-reading.jpg', 'Classroom', 3),
  ('Music Lesson', 'Learning rhythm and melody', '/gallery-music.jpg', 'Activities', 4),
  ('Science Discovery', 'Exploring the wonders of science', '/gallery-science.jpg', 'Activities', 5),
  ('Playground Fun', 'Enjoying our outdoor facilities', '/gallery-playground.jpg', 'Outdoor Play', 6),
  ('Classroom Activities', 'Learning through play', '/gallery-classroom.jpg', 'Classroom', 7),
  ('Sports Day', 'Active and healthy fun', '/gallery-sports.jpg', 'Events', 8)
on conflict do nothing;
