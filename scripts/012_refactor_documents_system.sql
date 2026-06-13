-- Migration 012: Create documents table for PDF/DOCX file management

-- Create documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_type TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on document_type for faster queries
CREATE INDEX IF NOT EXISTS idx_documents_type ON public.documents(document_type);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Anyone can view documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can manage documents" ON public.documents;

CREATE POLICY "Anyone can view documents"
  ON public.documents
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert documents"
  ON public.documents
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can update documents"
  ON public.documents
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can delete documents"
  ON public.documents
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Add trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_documents_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION update_documents_timestamp();
