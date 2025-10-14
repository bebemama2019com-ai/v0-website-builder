# Complete Supabase Setup Guide

## Current Status
✗ Environment variables are missing or incorrectly named

## Step 1: Add Environment Variables to Vercel

You need to add these environment variables to your Vercel project:

### Required Variables:

1. **SUPABASE_NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://bulrhtnvqxasrhjmihdk.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHJodG52cXhhc3Joam1paGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA4MjksImV4cCI6MjA3NjAyNjgyOX0.GAhmN8QbyYfyEjGQhNXgS6OfMQIUq6jtNiK-oOPw89I`

### How to Add Variables in Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value** (from above)
   - Select all environments (Production, Preview, Development)
   - Click **Save**
5. Repeat for the second variable
6. **Redeploy** your project for changes to take effect

## Step 2: Create Database Tables

Once the environment variables are set, run these SQL scripts in your Supabase dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project: `bulrhtnvqxasrhjmihdk`
3. Click **SQL Editor** → **New query**
4. Copy and paste the content from `scripts/000_complete_setup.sql`
5. Click **Run**

## Step 3: Create Your Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter your email and password
4. Click **Create user**
5. Copy the **User ID**
6. Go to **SQL Editor** and run:

\`\`\`sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('YOUR_USER_ID_HERE', 'your-email@example.com', 'admin');
\`\`\`

## Step 4: Test the Connection

1. Visit `/test-connection` on your deployed site
2. You should see:
   - ✓ Supabase URL found
   - ✓ Supabase Anon Key found
   - ✓ Connection successful
   - ✓ Tables exist

## Step 5: Access Admin Panel

1. Go to `/admin/login`
2. Enter your email and password from Step 3
3. Click **Sign In**
4. You should be redirected to `/admin` dashboard

## Troubleshooting

### "Missing environment variables" error
- Make sure you added both variables in Vercel
- Make sure you redeployed after adding variables
- Check that variable names are EXACTLY as shown (case-sensitive)

### "Invalid login credentials" error
- Make sure you created a user in Supabase Authentication
- Make sure you added your user ID to the `admin_users` table
- Check that your email/password are correct

### Tables don't exist
- Run the SQL script from `scripts/000_complete_setup.sql`
- Check for any errors in the SQL Editor

## What's Fixed

✓ Corrected environment variable names in client files
✓ Removed debugging console.logs
✓ Simplified client implementation following official Supabase patterns
✓ Both browser and server clients now use correct variable names

## Next Steps After Setup

Once everything is working:
1. Log in to admin panel at `/admin/login`
2. Manage team members at `/admin/team`
3. Create news posts at `/admin/news`
4. Upload gallery images at `/admin/gallery`
