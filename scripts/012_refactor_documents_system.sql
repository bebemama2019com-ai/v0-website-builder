-- Migration 012: Refactor documents table to support direct file uploads with PDF/DOCX validation

-- Add new columns to documents table
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS file_path TEXT,
ADD COLUMN IF NOT EXISTS file_name TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS document_type TEXT NOT NULL DEFAULT 'budget';

-- Update existing column to allow NULL file_url (for backward compatibility)
ALTER TABLE documents
ALTER COLUMN file_url DROP NOT NULL;

-- Create an index on document_type and order_index for faster queries
CREATE INDEX IF NOT EXISTS idx_documents_type_order ON documents(document_type, order_index);

-- Add unique constraint for document_type to ensure only one file per type
ALTER TABLE documents
ADD CONSTRAINT documents_type_unique UNIQUE(document_type);

-- Create storage bucket for documents if it doesn't exist (using trigger would be needed at application level)
-- The bucket 'documents' should be created separately with RLS policies
