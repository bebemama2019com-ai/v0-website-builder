# Storage Setup Instructions

## Creating the menu-files Storage Bucket

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
```

### Option 3: Supabase API

```javascript
const { data, error } = await supabase.storage.createBucket('menu-files', {
  public: true,
})
```

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

## Troubleshooting

### "Bucket not found" error
- Make sure the bucket is named exactly: `menu-files`
- Verify the bucket exists in your Supabase dashboard
- Check that you're connected to the correct Supabase project

### File upload fails silently
- Check RLS policies are correctly configured
- Verify file size is under 50MB
- Ensure the file is in PDF format

### Files can't be downloaded
- Check if the bucket is public or if RLS policies allow reading
- Verify the file URL is correct

## Verifying the Setup

After creating the bucket, test it by:

1. Going to the admin panel
2. Navigate to **Управление на Седмично меню** (Weekly Menu Management)
3. Try uploading a PDF file
4. You should see success message: "Файлът за детската градина беше успешно качен"
