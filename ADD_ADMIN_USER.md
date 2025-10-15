# Add Yourself as Admin User

Your authentication is working, but you need to add yourself to the admin_users table.

## Your User ID
\`\`\`
562e3771-1537-4b5c-89d1-f1c8569a9340
\`\`\`

## Steps to Add Admin Access

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste this SQL:

\`\`\`sql
INSERT INTO public.admin_users (id, email, full_name)
VALUES (
  '562e3771-1537-4b5c-89d1-f1c8569a9340',
  'bpavlov@threecolts.com',
  'Bogomil Pavlov'
);
\`\`\`

6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see: "Success. No rows returned"
8. Go back to the login page and try logging in again

## Verify It Worked

After running the SQL, you can verify by running:

\`\`\`sql
SELECT * FROM public.admin_users;
\`\`\`

You should see your user ID in the results.

## Troubleshooting

If you get an error like "duplicate key value", it means you're already in the table. Try:

\`\`\`sql
SELECT * FROM public.admin_users WHERE id = '562e3771-1537-4b5c-89d1-f1c8569a9340';
\`\`\`

If you see a result, you're already an admin and the login should work!
