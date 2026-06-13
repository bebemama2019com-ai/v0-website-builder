-- Create table for weekly menu files (Седмично меню)
-- Stores PDF files for kindergarten and nursery

CREATE TABLE IF NOT EXISTS public.weekly_menu_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_type TEXT NOT NULL UNIQUE CHECK (menu_type IN ('kindergarten', 'nursery')),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.weekly_menu_files ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure idempotency
DROP POLICY IF EXISTS "Anyone can view weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Only admins can manage weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can insert weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can update weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can delete weekly menu files" ON public.weekly_menu_files;

-- Policy: Anyone can view files
CREATE POLICY "Anyone can view weekly menu files"
  ON public.weekly_menu_files
  FOR SELECT
  USING (true);

-- Policy: Admins can insert
CREATE POLICY "Admins can insert weekly menu files"
  ON public.weekly_menu_files
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Policy: Admins can update
CREATE POLICY "Admins can update weekly menu files"
  ON public.weekly_menu_files
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Policy: Admins can delete
CREATE POLICY "Admins can delete weekly menu files"
  ON public.weekly_menu_files
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS weekly_menu_files_type_idx ON public.weekly_menu_files(menu_type);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_weekly_menu_files_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS weekly_menu_files_updated_at ON public.weekly_menu_files;

CREATE TRIGGER weekly_menu_files_updated_at
BEFORE UPDATE ON public.weekly_menu_files
FOR EACH ROW
EXECUTE FUNCTION update_weekly_menu_files_timestamp();
