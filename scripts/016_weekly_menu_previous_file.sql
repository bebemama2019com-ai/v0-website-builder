-- Keep the previous weekly menu next to the current one.
-- On each upload the current file moves into these columns and the new file becomes current.
-- Run this BEFORE deploying the code that uses them.

alter table public.weekly_menu_files
  add column if not exists previous_file_name text,
  add column if not exists previous_file_url text,
  add column if not exists previous_file_size integer,
  add column if not exists previous_updated_at timestamptz;
