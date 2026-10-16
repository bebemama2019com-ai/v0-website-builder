-- Security hardening (review items S2–S5).
-- Public read stays as it is everywhere; every write now requires a logged-in admin.

-- S2: groups and weekly schedules were writable by anyone ("manage" policies with USING true).
drop policy if exists "Админите могат да управляват груп" on public.groups;
drop policy if exists "Админите могат да управляват седм" on public.group_schedules;

create policy "Admins can insert groups" on public.groups for insert to authenticated
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "Admins can update groups" on public.groups for update to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "Admins can delete groups" on public.groups for delete to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "Admins can insert group schedules" on public.group_schedules for insert to authenticated
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "Admins can update group schedules" on public.group_schedules for update to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "Admins can delete group schedules" on public.group_schedules for delete to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

-- S5: any signed-in user could add themselves to admin_users. Admins are added from the dashboard only.
drop policy if exists "Admins can insert themselves" on public.admin_users;

-- S3/S4: storage. Both buckets are public, so downloads work without a read policy;
-- these replace the catch-all "Allow Public Read" policies and the anonymous menu-files writes.
drop policy if exists "Allow Public Read" on storage.buckets;
drop policy if exists "Allow Public Read" on storage.objects;
drop policy if exists "Allow Public Read 19qkzux_0" on storage.objects;
drop policy if exists "Allow Public Read 19qkzux_1" on storage.objects;
drop policy if exists "Allow Public Read 19qkzux_2" on storage.objects;
drop policy if exists "Allow Public Read 19qkzux_3" on storage.objects;

create policy "menu_files_public_read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'menu-files');
create policy "menu_files_admin_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'menu-files' and exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "menu_files_admin_update" on storage.objects for update to authenticated
  using (bucket_id = 'menu-files' and exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (bucket_id = 'menu-files' and exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "menu_files_admin_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'menu-files' and exists (select 1 from public.admin_users a where a.id = auth.uid()));

-- Advisor: functions with a mutable search_path.
alter function public.update_weekly_menu_files_timestamp() set search_path = public;
alter function public.update_documents_timestamp() set search_path = public;
alter function public.handle_updated_at() set search_path = public;
