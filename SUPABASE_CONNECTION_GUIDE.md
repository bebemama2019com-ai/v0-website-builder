# Supabase Connection Guide

## Current Status

Your Supabase integration is connected, but we need to verify the database setup.

## Step 1: Test the Connection

Visit this URL in your browser after deploying:
\`\`\`
https://your-site.vercel.app/api/test-supabase
\`\`\`

Or locally:
\`\`\`
http://localhost:3000/api/test-supabase
\`\`\`

This will show you:
- Whether the connection is working
- What environment variables are available
- If any tables exist in your database

## Step 2: Check Your Environment Variables

You should have these variables set in Vercel:

**Required:**
- `SUPABASE_NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

**Check in Vercel:**
1. Go to your project settings
2. Click "Environment Variables"
3. Verify these variables exist

## Step 3: Set Up Database Tables

Once the connection is verified, you need to run the SQL scripts to create the tables:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Copy the contents of `scripts/001_create_cms_tables.sql`
5. Paste and click "Run"
6. Repeat for `scripts/002_seed_sample_data.sql`

### Option B: Using the Supabase CLI

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
\`\`\`

## Step 4: Create Your First Admin User

After tables are created:

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. Enter email and password
4. Copy the User ID
5. Go to SQL Editor and run:

\`\`\`sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('YOUR_USER_ID', 'your-email@example.com', 'super_admin');
\`\`\`

## Step 5: Test Admin Login

1. Visit `/admin/login`
2. Enter your credentials
3. You should be redirected to the admin dashboard

## Troubleshooting

### "Missing Supabase credentials"
- Check that environment variables are set in Vercel
- Redeploy after adding variables

### "relation does not exist"
- Tables haven't been created yet
- Run the SQL scripts in Supabase Dashboard

### "Invalid API key"
- Check that you're using the correct anon key
- Verify the key in Supabase Dashboard > Settings > API

### Connection timeout
- Check your Supabase project is active
- Verify the URL is correct

## Need Help?

Check the debug logs by visiting `/api/test-supabase` - it will show detailed error messages.
