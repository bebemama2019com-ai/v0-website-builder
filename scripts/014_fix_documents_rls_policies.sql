-- Comprehensive fix for documents table RLS policies
-- This script disables RLS and removes all restrictive policies

-- Step 1: Drop ALL existing policies on documents table
DROP POLICY IF EXISTS "Admins can insert documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can update documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can manage documents - INSERT" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can manage documents - UPDATE" ON public.documents;
DROP POLICY IF EXISTS "Authenticated users can manage documents - DELETE" ON public.documents;
DROP POLICY IF EXISTS "documents_insert_policy" ON public.documents;
DROP POLICY IF EXISTS "documents_update_policy" ON public.documents;
DROP POLICY IF EXISTS "documents_delete_policy" ON public.documents;
DROP POLICY IF EXISTS "documents_select_policy" ON public.documents;

-- Step 2: Disable RLS entirely on the documents table
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify RLS is disabled (check via dashboard to confirm)
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'documents';
