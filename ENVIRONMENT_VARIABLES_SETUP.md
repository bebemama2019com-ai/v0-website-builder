# Environment Variables Setup Guide

## Missing Environment Variable

You need to add this environment variable to your Vercel project:

\`\`\`
SUPABASE_NEXT_PUBLIC_SUPABASE_URL=https://bulrhtnvqxasrhjmihdk.supabase.co
\`\`\`

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://bulrhtnvqxasrhjmihdk.supabase.co`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your project for changes to take effect

## All Required Environment Variables

Your project should have these Supabase environment variables:

✅ Already Set:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for admin operations)
- `POSTGRES_URL` - Database connection string
- `POSTGRES_URL_NON_POOLING` - Direct database connection
- `POSTGRES_PRISMA_URL` - Prisma connection string
- `SUPABASE_JWT_SECRET` - JWT secret for auth

❌ Missing (Add This):
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL

## Temporary Fallback

I've added a hardcoded fallback URL (`https://bulrhtnvqxasrhjmihdk.supabase.co`) in the code so your site will work immediately. However, you should still add the environment variable in Vercel for best practices.

## After Adding the Variable

1. Go to your Vercel project
2. Click **Deployments**
3. Click the three dots on the latest deployment
4. Click **Redeploy**
5. Test your site - the team members from Supabase should now appear!

## Verify Connection

Visit `/test-connection` on your site to verify the Supabase connection is working correctly.
