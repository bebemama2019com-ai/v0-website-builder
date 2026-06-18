-- Fix RLS policies for weekly_menu_files table
-- This allows authenticated users to manage menu files (for admin panel)

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can insert weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can update weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can delete weekly menu files" ON public.weekly_menu_files;

-- Create new policies that check for authenticated users instead of admin_users table
CREATE POLICY "Authenticated users can manage weekly menu files - INSERT"
  ON public.weekly_menu_files
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage weekly menu files - UPDATE"
  ON public.weekly_menu_files
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage weekly menu files - DELETE"
  ON public.weekly_menu_files
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
