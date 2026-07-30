-- Fix RLS policies for documents table
-- This allows authenticated users to manage documents (for admin panel)
-- Changed from checking admin_users table to checking if user is authenticated

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can insert documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can update documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;

-- Create new policies that check for authenticated users
CREATE POLICY "Authenticated users can manage documents - INSERT"
  ON public.documents
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage documents - UPDATE"
  ON public.documents
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage documents - DELETE"
  ON public.documents
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
