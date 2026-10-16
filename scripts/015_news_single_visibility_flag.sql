-- News visibility is controlled by is_active only (the flag the admin panel edits).
-- Run this BEFORE deploying the code that reads news with the visitor's session.

drop policy if exists "Anyone can view published news posts" on public.news_posts;
drop policy if exists "Admins can view all news posts" on public.news_posts;

create policy "Anyone can view active news posts" on public.news_posts
  for select to anon, authenticated
  using (is_active = true);

create policy "Admins can view all news posts" on public.news_posts
  for select to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

-- `published` was never set by the app (all rows false) and is no longer used.
alter table public.news_posts drop column published;
