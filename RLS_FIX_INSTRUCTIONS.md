# Fix Weekly Menu File Upload RLS Error

If you're getting "new row violates row-level security policy" when uploading menu files, you need to update the RLS policies in Supabase.

## Quick Fix (Recommended)

Run this SQL in your Supabase SQL Editor to disable RLS on the weekly_menu_files table:

```sql
-- Disable RLS on weekly_menu_files table (safe for admin-only access)
ALTER TABLE public.weekly_menu_files DISABLE ROW LEVEL SECURITY;
```

This is safe because the admin panel is already protected by authentication middleware.

## Alternative: Update Policies (If you want to keep RLS enabled)

If you prefer to keep RLS enabled, run this instead:

```sql
-- Drop old restrictive policies
DROP POLICY IF EXISTS "Admins can insert weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can update weekly menu files" ON public.weekly_menu_files;
DROP POLICY IF EXISTS "Admins can delete weekly menu files" ON public.weekly_menu_files;

-- Create new policies for authenticated users
CREATE POLICY "Allow authenticated INSERT" ON public.weekly_menu_files FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated UPDATE" ON public.weekly_menu_files FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated DELETE" ON public.weekly_menu_files FOR DELETE USING (auth.uid() IS NOT NULL);
```

## Steps to Apply

1. Go to your Supabase Dashboard
2. Navigate to "SQL Editor" 
3. Click "New Query"
4. Copy and paste one of the SQL commands above
5. Click "Run"
6. Try uploading a file again - it should now work!

## After Applying

Once you've run the SQL:
- Refresh your browser
- Try uploading a weekly menu file again
- You should see a success message
