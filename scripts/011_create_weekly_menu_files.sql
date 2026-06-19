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

-- Policy: Authenticated users can manage files (for admin panel access)
CREATE POLICY "Authenticated users can manage weekly menu files"
  ON public.weekly_menu_files
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Authenticated users can update
CREATE POLICY "Authenticated users can update weekly menu files"
  ON public.weekly_menu_files
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Policy: Authenticated users can delete
CREATE POLICY "Authenticated users can delete weekly menu files"
  ON public.weekly_menu_files
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

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
