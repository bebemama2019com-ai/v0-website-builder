# ДГ 202 — Website

Public website for Детска градина 202 with public information, parent resources, administrative documents, weekly menus, gallery content, and news.

## Technology

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 and shadcn/ui
- **Backend and storage:** Supabase Auth, database, and Storage
- **Icons:** Lucide React
- **Deployment:** Vercel

## Main areas

- Public homepage and informational pages
- Parent resources under `/parents`
- Administrative documents under `/documents`
- Admin dashboard under `/admin`
- Weekly menu management under `/admin/weekly-menu`
- Document management under `/admin/documents-new`
- News, gallery, team and groups managed in the admin dashboard (stored in Supabase)

## Local development

### Requirements

- Node.js 18+
- Access to the project's Supabase project

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Configure the project variables in the Vercel project or in `.env.local` for local development. The application uses the following integrations:

```text
NEXT_PUBLIC_SUPABASE_URL        # required
NEXT_PUBLIC_SUPABASE_ANON_KEY   # required
RESEND_API_KEY                  # contact form
CONTACT_TO_EMAIL                # optional, default dg202sofia@abv.bg
CONTACT_FROM_EMAIL              # optional, sender on a domain verified in Resend
```

The app refuses to start without the two Supabase variables. Access control is enforced by Supabase row-level security, so the app does not use the service-role key. Do not commit `.env` files.

## Supabase setup

The application uses two public Storage buckets:

- `menu-files` — weekly menu PDFs
- `documents` — administrative documents such as budget reports and policies

Create both buckets before testing uploads. See [`STORAGE_SETUP.md`](./STORAGE_SETUP.md) for dashboard, CLI, API, and Storage policy instructions.

Database setup and document-related migrations are in [`scripts/`](./scripts), including:

- `003_add_documents_and_parents_tables.sql`
- `005_add_quarter_to_documents.sql`
- `012_refactor_documents_system.sql`
- `014_fix_documents_rls_policies.sql`

Run the applicable SQL scripts against the connected Supabase project before using the admin upload pages. Confirm the `documents` table schema and Storage policies in the production Supabase project; local migrations do not automatically change production.

## Admin workflows

### Weekly menus

Use **Управление на Седмично меню** to upload or replace weekly menu PDFs for the nursery and kindergarten. Files are stored in the `menu-files` bucket.

### Administrative documents

Use `/admin/documents-new` to upload or replace PDF, DOC, and DOCX files. Files are stored in the `documents` bucket and tracked in the `documents` database table. Public document pages use the database record to determine whether a download is available.

### Content management

News, gallery images, team members, groups and parent information are edited in the admin dashboard (`/admin`) and stored in Supabase. Refer to [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md) for the content-management workflow.

## Production deployment

1. Push the branch to GitHub.
2. Confirm all required environment variables are configured in Vercel.
3. Confirm both Supabase Storage buckets exist and have the required policies.
4. Apply database migrations to the production Supabase project.
5. Deploy through Vercel.

Runtime uploads must use Supabase Storage. The Vercel filesystem and the project's `public` directory are not writable for persistent production uploads.

## Troubleshooting uploads

- **Bucket not found:** Create or verify the `documents` or `menu-files` bucket.
- **Row-level security error:** Check the active database and Storage policies in the production Supabase project, not only the local SQL files.
- **File is uploaded but no download appears:** Confirm the matching record exists in the `documents` table and that its `file_path` matches the expected filename.
- **Authentication error:** Confirm the admin session is active and the Supabase redirect URL is configured.
- **Large file failure:** PDF, DOC, and DOCX uploads are limited to 50 MB.

## Useful commands

```bash
npm run dev
npm run build
npm run start
```

## Related documentation

- [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md)
- [`STORAGE_SETUP.md`](./STORAGE_SETUP.md)
- [`SETUP_DOCUMENTS_AND_PARENTS.md`](./SETUP_DOCUMENTS_AND_PARENTS.md)

## License

Private project for ДГ 202.

Copyright © 2026 ДГ 202. All rights reserved.
