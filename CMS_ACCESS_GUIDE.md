# Content Management System (CMS) Access Guide

## Overview

Your kindergarten website uses **Sanity CMS** as the backend content management system. This allows you to easily manage all website content without touching any code.

## What is Sanity CMS?

Sanity is a headless CMS that provides:
- ✅ User-friendly admin interface
- ✅ Built-in authentication and user management
- ✅ Real-time content updates
- ✅ Image upload and management
- ✅ Multi-language support
- ✅ Version control for content

## How to Access the Admin Panel

### Option 1: Sanity Studio (Recommended)

1. **Go to your Sanity project dashboard:**
   - Visit: `https://www.sanity.io/manage`
   - Log in with your Sanity account credentials

2. **Select your project:**
   - Find "Little Sprouts Kindergarten" (or your project name)
   - Click on it to open the project dashboard

3. **Open Sanity Studio:**
   - Click "Studio" in the left sidebar
   - This opens the content management interface

### Option 2: Self-Hosted Studio (If Deployed)

If you've deployed Sanity Studio to your own domain:
- Visit: `https://yourdomain.com/studio`
- Log in with your Sanity credentials

## What You Can Manage

### 1. **Team Members**
- Add/edit/remove staff profiles
- Upload teacher photos
- Update bios and roles
- Reorder team members

### 2. **News & Events**
- Create blog posts and announcements
- Add featured images
- Categorize posts (News, Events, Activities)
- Schedule publish dates
- Write rich text content with formatting

### 3. **Gallery Images**
- Upload photos from kindergarten activities
- Organize by category (Classroom, Outdoor Play, Activities, Events)
- Add titles and descriptions
- Manage image order

### 4. **Page Content**
- Edit homepage content
- Update about page information
- Modify curriculum details
- Change contact information

## Content Types Available

### Team Member Schema
\`\`\`
- Name (text)
- Role (text)
- Bio (text)
- Image (file upload)
- Order (number for sorting)
\`\`\`

### News Post Schema
\`\`\`
- Title (text)
- Slug (URL-friendly name)
- Excerpt (short description)
- Content (rich text editor)
- Featured Image (file upload)
- Category (News, Events, Activities)
- Published Date
- Author
\`\`\`

### Gallery Image Schema
\`\`\`
- Title (text)
- Image (file upload)
- Category (Classroom, Outdoor Play, Activities, Events)
- Date
- Description (optional)
\`\`\`

### Page Content Schema
\`\`\`
- Page Name
- Sections (flexible content blocks)
- SEO metadata
\`\`\`

## Adding New Content

### To Add a Team Member:
1. Go to "Team Members" in Sanity Studio
2. Click "Create new"
3. Fill in the form:
   - Name
   - Role (e.g., "Lead Teacher")
   - Bio (description)
   - Upload photo
   - Set order number
4. Click "Publish"

### To Add a News Post:
1. Go to "News Posts" in Sanity Studio
2. Click "Create new"
3. Fill in:
   - Title
   - Slug (auto-generated from title)
   - Excerpt (summary)
   - Content (full article with rich text)
   - Upload featured image
   - Select category
   - Set publish date
4. Click "Publish"

### To Add Gallery Images:
1. Go to "Gallery" in Sanity Studio
2. Click "Create new"
3. Upload image
4. Add title
5. Select category
6. Set date
7. Click "Publish"

## User Management

### Adding Admin Users:
1. Go to your Sanity project dashboard
2. Click "Settings" → "Members"
3. Click "Invite member"
4. Enter email address
5. Set role (Administrator, Editor, or Viewer)
6. Send invitation

### User Roles:
- **Administrator**: Full access to all content and settings
- **Editor**: Can create, edit, and publish content
- **Viewer**: Read-only access

## Environment Variables

Your website is already configured with these Sanity environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually "production")

These are automatically set up in your Vercel deployment.

## Content Updates

### How Fast Do Changes Appear?
- Content changes in Sanity appear on your website within **60 seconds**
- The website uses Incremental Static Regeneration (ISR)
- No need to rebuild or redeploy the site

### Preview Mode:
You can preview unpublished content before making it live:
1. Create/edit content in Sanity
2. Don't click "Publish" yet
3. Use Sanity's preview feature to see how it looks
4. When ready, click "Publish"

## Troubleshooting

### Content Not Updating?
1. Check if you clicked "Publish" in Sanity Studio
2. Wait 60 seconds for cache to refresh
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors

### Can't Log In?
1. Verify you're using the correct Sanity account
2. Check if your account has access to the project
3. Reset password if needed at sanity.io
4. Contact project administrator to verify permissions

### Images Not Showing?
1. Ensure images are published in Sanity
2. Check image file size (max 10MB recommended)
3. Verify image format (JPG, PNG, WebP supported)
4. Check browser console for 404 errors

## Support Resources

### Sanity Documentation:
- Getting Started: https://www.sanity.io/docs
- Content Studio: https://www.sanity.io/docs/sanity-studio
- Schema Types: https://www.sanity.io/docs/schema-types

### Video Tutorials:
- Sanity Studio Basics: https://www.sanity.io/guides
- Content Management: https://www.youtube.com/c/SanityCMS

### Need Help?
- Sanity Support: support@sanity.io
- Community Slack: https://slack.sanity.io
- Documentation: https://www.sanity.io/help

## Quick Reference

### Common Tasks:

| Task | Steps |
|------|-------|
| Add team member | Studio → Team Members → Create new → Fill form → Publish |
| Post news | Studio → News Posts → Create new → Write content → Publish |
| Upload photos | Studio → Gallery → Create new → Upload image → Publish |
| Edit homepage | Studio → Pages → Home → Edit sections → Publish |
| Change contact info | Studio → Settings → Contact Info → Update → Publish |

## Security Best Practices

1. **Use strong passwords** for Sanity accounts
2. **Enable 2FA** (two-factor authentication) in Sanity settings
3. **Limit admin access** - only give permissions to trusted users
4. **Regular backups** - Sanity automatically backs up your content
5. **Review user access** periodically and remove inactive users

## Next Steps

1. ✅ Log in to Sanity Studio
2. ✅ Familiarize yourself with the interface
3. ✅ Add your first team member or news post
4. ✅ Upload some gallery images
5. ✅ Invite other administrators if needed

---

**Remember:** You don't need to be a developer to manage your website content. Sanity Studio provides an intuitive interface for all content management tasks!
