-- Create menu-files storage bucket
-- This script creates the storage bucket for weekly menu PDF files

-- Note: Storage buckets are created via the Supabase dashboard or API
-- The following SQL is for reference, but buckets should be created using:
-- 1. Supabase Dashboard -> Storage -> Create New Bucket
-- 2. Or via Supabase CLI

-- To create the bucket via CLI:
-- supabase storage create-bucket menu-files --public

-- To create the bucket via dashboard:
-- 1. Go to Supabase Dashboard
-- 2. Select your project
-- 3. Go to Storage
-- 4. Click "Create a new bucket"
-- 5. Name: menu-files
-- 6. Make it Public (or Private if you prefer)

-- After creating the bucket, set up RLS policies:
-- Allow public read access (if public) and authenticated write access

CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'menu-files');

CREATE POLICY "Allow authenticated upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'menu-files'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated delete" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'menu-files'
    AND auth.role() = 'authenticated'
  );

-- Create documents storage bucket
-- This bucket stores administrative documents like budget reports

-- To create the documents bucket via CLI:
-- supabase storage create-bucket documents --public

-- To create the bucket via dashboard:
-- 1. Go to Supabase Dashboard
-- 2. Select your project
-- 3. Go to Storage
-- 4. Click "Create a new bucket"
-- 5. Name: documents
-- 6. Make it Public

-- After creating the bucket, set up RLS policies:
CREATE POLICY "Allow public read documents" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated upload documents" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated delete documents" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
  );
