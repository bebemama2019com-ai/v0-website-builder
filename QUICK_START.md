# Quick Start - Get Your CMS Running in 5 Minutes

## Option 1: Use Sanity Cloud (Recommended - No Installation)

### Step 1: Create Sanity Project (2 minutes)
1. Go to https://www.sanity.io/
2. Sign up/Login (free)
3. Click "Create project"
4. Name: "Kindergarten Website"
5. **Copy your Project ID** (looks like: `abc123xyz`)

### Step 2: Update Environment Variables (1 minute)
In your Vercel project:
1. Go to Settings → Environment Variables
2. Find `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Paste your Project ID from Step 1
4. Click "Save"
5. Redeploy your site

### Step 3: Access Your CMS (1 minute)
1. Go to https://www.sanity.io/manage
2. Click your "Kindergarten Website" project
3. Click "Studio" button
4. Start adding content!

**That's it!** Your CMS is ready. The schema is already configured.

---

## Option 2: Install Sanity Studio Locally

If you want to run the CMS on your own domain:

\`\`\`bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login
sanity login

# Initialize in your project
sanity init

# Follow the prompts:
# - Use existing project: Select your project
# - Dataset: production
# - Output path: ./sanity

# Deploy to Sanity
cd sanity
sanity deploy
\`\`\`

Your studio will be at: `https://your-name.sanity.studio`

---

## What You Can Manage

Once logged in to Sanity Studio, you can:

- ✅ **Team Members**: Add/edit teachers with photos and bios
- ✅ **News & Events**: Create blog posts and announcements  
- ✅ **Gallery**: Upload and organize photos by category
- ✅ **All content** appears on your website automatically

---

## First Time Setup Checklist

- [ ] Created Sanity account
- [ ] Created "Kindergarten Website" project
- [ ] Copied Project ID
- [ ] Updated `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel
- [ ] Redeployed site
- [ ] Accessed Sanity Studio
- [ ] Added first piece of content

---

## Need Help?

The schema is already configured in your project. You just need to:
1. Create the Sanity project
2. Connect it with the Project ID
3. Start adding content

No coding required!
