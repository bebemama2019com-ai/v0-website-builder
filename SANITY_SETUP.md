# Sanity CMS Setup Instructions

This kindergarten website uses Sanity as a headless CMS for content management.

## Setup Steps

1. **Create a Sanity Account**
   - Go to https://www.sanity.io/
   - Sign up for a free account

2. **Create a New Project**
   - Run: `npm create sanity@latest`
   - Or create a project in the Sanity dashboard

3. **Configure Environment Variables**
   Add these to your Vercel project or `.env.local`:
   \`\`\`
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   \`\`\`

4. **Import the Schema**
   - Copy the schema definitions from `sanity-schema.json`
   - Add them to your Sanity Studio schema files
   - Deploy the schema to your Sanity project

5. **Access Sanity Studio**
   - Your Sanity Studio will be available at: `https://your-project.sanity.studio`
   - Or run locally: `npm run sanity dev`

## Content Types

- **Team Members**: Add teachers and staff with photos and bios
- **News Posts**: Create blog posts for news and events
- **Gallery Images**: Upload photos organized by category
- **Pages**: Manage content for About, Curriculum, and other pages

## Admin Access

Admins can log in to Sanity Studio to manage all content. The website automatically fetches and displays updated content.
