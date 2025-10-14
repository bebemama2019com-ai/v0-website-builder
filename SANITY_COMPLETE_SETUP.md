# Complete Sanity CMS Setup Guide

## Quick Start - 3 Steps to Get Your CMS Running

### Step 1: Create a Sanity Project

1. Go to https://www.sanity.io/
2. Click "Get Started" and sign up (free account)
3. Once logged in, click "Create New Project"
4. Name it: "Kindergarten Website"
5. Choose dataset: "production"
6. **Save your Project ID** - you'll need it in Step 2

### Step 2: Add Environment Variables

You already have these environment variables in your Vercel project:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

**Update them with your new project details:**

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Update:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID from Step 1
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. Redeploy your site

### Step 3: Set Up Sanity Studio

Run these commands in your project folder:

\`\`\`bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity in your project
sanity init --project <YOUR_PROJECT_ID> --dataset production

# Deploy the studio
sanity deploy
\`\`\`

When prompted:
- Studio hostname: Choose a name like `kindergarten-admin`
- Your studio will be at: `https://kindergarten-admin.sanity.studio`

### Step 4: Import the Schema

After running `sanity init`, you'll have a `sanity` folder. Replace the schema files with:

**File: `sanity/schemas/teamMember.ts`**
\`\`\`typescript
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
}
\`\`\`

**File: `sanity/schemas/newsPost.ts`**
\`\`\`typescript
export default {
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Events', value: 'Events' },
          { title: 'Activities', value: 'Activities' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
}
\`\`\`

**File: `sanity/schemas/galleryImage.ts`**
\`\`\`typescript
export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Classroom', value: 'Classroom' },
          { title: 'Outdoor Play', value: 'Outdoor Play' },
          { title: 'Activities', value: 'Activities' },
          { title: 'Events', value: 'Events' },
          { title: 'Facilities', value: 'Facilities' },
        ],
      },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
  ],
}
\`\`\`

**File: `sanity/schemas/index.ts`**
\`\`\`typescript
import teamMember from './teamMember'
import newsPost from './newsPost'
import galleryImage from './galleryImage'

export const schemaTypes = [teamMember, newsPost, galleryImage]
\`\`\`

Then run:
\`\`\`bash
sanity deploy
\`\`\`

## Accessing Your CMS

After setup, you can access your CMS at:
- **Online**: `https://your-studio-name.sanity.studio`
- **Or in Sanity Dashboard**: https://www.sanity.io/manage → Select your project → Click "Studio"

## Adding Content

1. Log in to your Sanity Studio
2. You'll see three content types:
   - **Team Member**: Add teachers and staff
   - **News Post**: Create news articles and events
   - **Gallery Image**: Upload photos

3. Click any content type and click "Create new"
4. Fill in the fields and click "Publish"
5. Your website will automatically show the new content within 60 seconds

## Troubleshooting

**Problem**: Can't see my project in Sanity
- **Solution**: Make sure you're logged in with the same account you used to create the project

**Problem**: Environment variables not working
- **Solution**: After updating environment variables in Vercel, you must redeploy your site

**Problem**: Content not showing on website
- **Solution**: 
  1. Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your actual project ID
  2. Make sure content is published (not just saved as draft)
  3. Wait 60 seconds for cache to refresh

## Need Help?

If you're still having issues:
1. Check your Sanity project ID matches the environment variable
2. Verify the dataset name is "production"
3. Make sure you've deployed the schema to Sanity
4. Check that content is published in Sanity Studio
