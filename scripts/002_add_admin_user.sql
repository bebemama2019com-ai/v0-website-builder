-- Add admin user for bpavlov@threecolts.com
-- This script adds the authenticated user to the admin_users table

insert into public.admin_users (id, email, full_name)
values (
  '562e3771-1537-4b5c-89d1-f1c8569a9340',
  'bpavlov@threecolts.com',
  'Admin User'
)
on conflict (id) do nothing;
