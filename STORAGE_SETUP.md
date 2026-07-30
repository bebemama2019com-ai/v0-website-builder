# Storage Setup Instructions

This project requires two storage buckets in Supabase:
- **menu-files** - For weekly menu PDFs
- **documents** - For administrative documents (budget reports, etc.)

## Quick Setup

Run this command to create both buckets automatically:

```bash
node scripts/create-storage-buckets.mjs
```

Requires environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Creating Storage Buckets Manually

### Creating the menu-files Storage Bucket

The file upload feature requires a "menu-files" storage bucket in Supabase. Follow these steps:

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** (left sidebar)
3. Click **Create a new bucket**
4. Enter the bucket name: `menu-files`
5. Choose visibility:
   - **Public** - Anyone can view the files (recommended for menu PDFs)
   - **Private** - Only authenticated users can access
6. Click **Create bucket**

### Option 2: Supabase CLI

```bash
supabase storage create-bucket menu-files --public
supabase storage create-bucket documents --public
```

### Option 3: Supabase API

```javascript
const { data, error } = await supabase.storage.createBucket('menu-files', {
  public: true,
})

const { data: docs, error: docsError } = await supabase.storage.createBucket('documents', {
  public: true,
})
```

### Creating the documents Storage Bucket

The documents bucket stores administrative documents like budget reports:

1. Go to your Supabase project dashboard
2. Navigate to **Storage** (left sidebar)
3. Click **Create a new bucket**
4. Enter the bucket name: `documents`
5. Choose visibility: **Public**
6. Click **Create bucket**

## Setting Up Row Level Security (RLS) Policies

Once the bucket is created, you may need to set up RLS policies:

1. Go to **Storage** → **Policies**
2. Select the `menu-files` bucket
3. Add these policies:

**Allow Public Read:**
- Target roles: `anon`, `authenticated`
- Permissions: `SELECT`
- With check: `bucket_id = 'menu-files'`

**Allow Authenticated Upload:**
- Target roles: `authenticated`
- Permissions: `INSERT`
- With check: `bucket_id = 'menu-files' AND auth.role() = 'authenticated'`

**Allow Authenticated Delete:**
- Target roles: `authenticated`
- Permissions: `DELETE`
- With check: `bucket_id = 'menu-files' AND auth.role() = 'authenticated'`

**For documents bucket, repeat the same steps but replace `menu-files` with `documents`:**

**Allow Public Read (documents):**
- Target roles: `anon`, `authenticated`
- Permissions: `SELECT`
- With check: `bucket_id = 'documents'`

**Allow Authenticated Upload (documents):**
- Target roles: `authenticated`
- Permissions: `INSERT`
- With check: `bucket_id = 'documents' AND auth.role() = 'authenticated'`

**Allow Authenticated Delete (documents):**
- Target roles: `authenticated`
- Permissions: `DELETE`
- With check: `bucket_id = 'documents' AND auth.role() = 'authenticated'`

## Troubleshooting

### "Bucket not found" error
- Make sure both buckets exist: `menu-files` and `documents`
- Verify the buckets exist in your Supabase dashboard under Storage
- Check that you're connected to the correct Supabase project
- Try running: `node scripts/create-storage-buckets.mjs` to create them

### File upload fails silently
- Check RLS policies are correctly configured
- Verify file size is under 50MB
- Ensure the file is in PDF format

### Files can't be downloaded
- Check if the bucket is public or if RLS policies allow reading
- Verify the file URL is correct

## Verifying the Setup

After creating both buckets, test them by:

1. Going to the admin panel
2. For menu-files bucket:
   - Navigate to **Управление на Седмично меню** (Weekly Menu Management)
   - Try uploading a PDF file for kindergarten or nursery
   - You should see success message: "Файлът беше успешно качен"
3. For documents bucket:
   - Navigate to **Отчет Бюджет 2025** (Budget Report 2025)
   - Try uploading a document file
   - You should see success message: "Файлът беше успешно качен"
