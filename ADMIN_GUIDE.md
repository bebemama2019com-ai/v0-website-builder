# Admin Guide - Little Sprouts Kindergarten Website

This guide explains how administrators can manage content on the Little Sprouts Kindergarten website.

## Admin Access

The website uses **Sanity CMS** for content management. All content editing is done through the Sanity Studio dashboard, which has built-in authentication and user management.

### Accessing Sanity Studio

1. **Online Dashboard**: Visit your Sanity Studio at `https://your-project.sanity.studio`
2. **Local Development**: Run `npm run sanity dev` to access Studio locally

### Admin Login

- Admins log in using their Sanity account credentials
- Sanity handles all authentication, password resets, and security
- No separate admin login is needed in the Next.js application

## Managing Content

### Team Members

**Location**: Content → Team Member

**What you can do**:
- Add new teachers and staff members
- Upload photos and write bios
- Set display order
- Update roles and information

**Fields**:
- Name (required)
- Role (required)
- Biography
- Photo
- Display Order (number)

### News & Events

**Location**: Content → News Post

**What you can do**:
- Create news articles and event announcements
- Add featured images
- Categorize posts (News, Events, Activities)
- Schedule publication dates
- Write rich text content

**Fields**:
- Title (required)
- Slug (auto-generated from title)
- Excerpt (short summary)
- Content (rich text editor)
- Featured Image
- Category
- Published Date

### Photo Gallery

**Location**: Content → Gallery Image

**What you can do**:
- Upload photos from classroom activities
- Organize by category
- Add titles and dates

**Fields**:
- Title
- Image
- Category (Classroom, Outdoor Play, Activities, Events, Facilities)
- Date

### Pages

**Location**: Content → Page

**What you can do**:
- Edit content for About, Curriculum, and other pages
- Update hero images
- Modify page text and descriptions

**Fields**:
- Title (required)
- Slug
- Content (rich text editor)
- Hero Image

## User Roles

Sanity supports multiple user roles:

- **Administrator**: Full access to all content and settings
- **Editor**: Can create and edit content
- **Viewer**: Read-only access

### Adding New Admins

1. Go to your Sanity project dashboard
2. Navigate to Settings → Members
3. Click "Invite members"
4. Enter email address and select role
5. Send invitation

## Content Publishing

- All changes are published immediately
- The website automatically fetches new content every 60 seconds
- No manual deployment needed for content updates

## Best Practices

### Images

- **Team Photos**: Use high-quality headshots (400x400px minimum)
- **Gallery Images**: Use landscape orientation (800x600px minimum)
- **News Images**: Use 1200x600px for best results
- Keep file sizes under 2MB for faster loading

### Writing Content

- Use clear, friendly language appropriate for parents
- Keep paragraphs short and easy to read
- Include relevant keywords for SEO
- Proofread before publishing

### News Posts

- Write engaging headlines
- Include a compelling excerpt (1-2 sentences)
- Add relevant images
- Categorize correctly (News, Events, or Activities)
- Set accurate publication dates

## Technical Support

If you need help with:
- **Content Management**: Refer to [Sanity Documentation](https://www.sanity.io/docs)
- **Website Issues**: Contact your web developer
- **Sanity Account Issues**: Contact Sanity support

## Security

- Never share your admin credentials
- Use strong, unique passwords
- Enable two-factor authentication in Sanity settings
- Regularly review user access and remove inactive accounts

## Backup & Recovery

- Sanity automatically backs up all content
- Content history is preserved and can be restored
- Previous versions of documents can be viewed in the Studio

## Quick Reference

| Task | Location | Action |
|------|----------|--------|
| Add teacher | Team Member | Create new document |
| Post news | News Post | Create new document |
| Upload photos | Gallery Image | Create new document |
| Edit About page | Page → About | Edit existing document |
| Manage users | Sanity Dashboard → Settings | Invite/remove members |

---

For additional help, refer to the `SANITY_SETUP.md` file for initial setup instructions.
