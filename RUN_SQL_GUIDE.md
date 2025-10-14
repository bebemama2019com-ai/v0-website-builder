# How to Run SQL Scripts in Supabase

## Quick Steps

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Log in to your account
   - Select your project: `bulrhtnvqxasrhjmihdk`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query" button

3. **Copy and Paste the SQL**
   - Open the file: `scripts/000_complete_setup.sql`
   - Copy ALL the content
   - Paste it into the SQL Editor

4. **Run the Script**
   - Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for it to complete (should take 5-10 seconds)
   - You should see "Success. No rows returned" message

5. **Verify Tables Were Created**
   - Click on "Table Editor" in the left sidebar
   - You should see these tables:
     - `team_members`
     - `news_posts`
     - `gallery_images`
     - `admin_users`

## What This Script Does

- Creates 4 tables for your CMS content
- Sets up Row Level Security (RLS) for data protection
- Creates indexes for better performance
- Adds sample data (team members, news posts, gallery images)
- Sets up automatic timestamp updates

## Next Steps After Running SQL

1. **Create Your Admin User**
   - Go to Authentication > Users in Supabase
   - Click "Add user" > "Create new user"
   - Enter your email and password
   - Copy the User ID (UUID)

2. **Add Yourself as Admin**
   - Go back to SQL Editor
   - Run this query (replace YOUR_USER_ID with the UUID you copied):
   \`\`\`sql
   insert into public.admin_users (id, email, full_name)
   values ('YOUR_USER_ID', 'your-email@example.com', 'Your Name');
   \`\`\`

3. **Test the Connection**
   - Visit `/test-connection` on your website
   - It should show all tables exist and have data

4. **Log In to Admin Panel**
   - Visit `/admin/login` on your website
   - Use the email and password you created
   - Start managing your content!

## Troubleshooting

**If you get "relation already exists" errors:**
- This is normal if you're running the script again
- The script uses `create table if not exists` so it's safe to run multiple times

**If you get permission errors:**
- Make sure you're logged in as the project owner
- Check that RLS is properly configured

**If tables are empty:**
- The sample data might not have inserted
- You can manually add content through the admin panel

## Need Help?

Check the `/test-connection` page to see detailed status of your database setup.
