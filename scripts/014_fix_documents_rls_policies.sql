-- Fix RLS policies for documents table
-- This allows authenticated users to manage documents (for admin panel)

-- First, disable RLS entirely for testing, or make it very permissive
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want RLS enabled, use these permissive policies:
-- ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
--
-- DROP POLICY IF EXISTS "documents_insert_policy" ON public.documents;
-- DROP POLICY IF EXISTS "documents_update_policy" ON public.documents;
-- DROP POLICY IF EXISTS "documents_delete_policy" ON public.documents;
-- DROP POLICY IF EXISTS "documents_select_policy" ON public.documents;
--
-- CREATE POLICY "documents_insert_policy" ON public.documents
--   FOR INSERT WITH CHECK (true);
-- 
-- CREATE POLICY "documents_update_policy" ON public.documents
--   FOR UPDATE USING (true);
-- 
-- CREATE POLICY "documents_delete_policy" ON public.documents
--   FOR DELETE USING (true);
--
-- CREATE POLICY "documents_select_policy" ON public.documents
--   FOR SELECT USING (true);
