-- Add new fields to news_posts table for news and events management
-- Add active status, date, time, from (author), and file attachments support

ALTER TABLE public.news_posts
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS news_date date DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS news_hour time DEFAULT '09:00'::time,
ADD COLUMN IF NOT EXISTS from_text text DEFAULT '';

-- Create news_files table for managing file attachments
CREATE TABLE IF NOT EXISTS public.news_files (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL REFERENCES public.news_posts(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS news_files_news_id_idx ON public.news_files(news_id);
CREATE INDEX IF NOT EXISTS news_posts_is_active_idx ON public.news_posts(is_active);
CREATE INDEX IF NOT EXISTS news_posts_date_idx ON public.news_posts(news_date DESC);

-- Enable RLS on news_files
ALTER TABLE public.news_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news_files - Drop all existing policies first
DROP POLICY IF EXISTS "Anyone can view news files" ON public.news_files;
DROP POLICY IF EXISTS "Admins can insert news files" ON public.news_files;
DROP POLICY IF EXISTS "Admins can delete news files" ON public.news_files;
DROP POLICY IF EXISTS "Admins can update news files" ON public.news_files;

-- Create policies
CREATE POLICY "Anyone can view news files"
  ON public.news_files FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert news files"
  ON public.news_files FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can delete news files"
  ON public.news_files FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can update news files"
  ON public.news_files FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));
