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

-- Policy: Anyone can view files
CREATE POLICY "Anyone can view weekly menu files"
  ON public.weekly_menu_files
  FOR SELECT
  USING (true);

-- Policy: Only admins can manage files
CREATE POLICY "Only admins can manage weekly menu files"
  ON public.weekly_menu_files
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create index for faster lookups
CREATE INDEX weekly_menu_files_type_idx ON public.weekly_menu_files(menu_type);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_weekly_menu_files_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER weekly_menu_files_updated_at
BEFORE UPDATE ON public.weekly_menu_files
FOR EACH ROW
EXECUTE FUNCTION update_weekly_menu_files_timestamp();
