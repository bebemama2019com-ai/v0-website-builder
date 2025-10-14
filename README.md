# Little Sprouts Kindergarten Website

A modern, responsive kindergarten website built with Next.js and Sanity CMS.

## Features

- **Responsive Design**: Mobile-first design with warm, child-friendly aesthetics
- **Content Management**: Easy-to-use Sanity CMS for managing all content
- **Dynamic Pages**: Home, About, Team, Curriculum, Gallery, News/Events, Contact
- **Photo Gallery**: Filterable image gallery with lightbox view
- **Blog System**: News and events with rich text content
- **Contact Form**: Integrated contact form with validation
- **SEO Optimized**: Built with Next.js for excellent performance and SEO

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity
- **UI Components**: shadcn/ui
- **Fonts**: Nunito (Google Fonts)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Sanity account and project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd kindergarten-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   \`\`\`

4. **Set up Sanity CMS**
   
   Follow the instructions in \`SANITY_SETUP.md\` to configure your Sanity project.

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── curriculum/        # Curriculum page
│   ├── gallery/           # Gallery page
│   ├── news/              # News listing and posts
│   ├── team/              # Team page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── ...               # Other components
├── lib/                   # Utility functions
│   ├── sanity.ts         # Sanity client
│   └── sanity-queries.ts # CMS queries
├── public/               # Static assets
└── sanity-schema.json    # Sanity schema definition
\`\`\`

## Content Management

Administrators can manage all website content through Sanity Studio:

- **Team Members**: Add/edit teacher profiles
- **News & Events**: Create blog posts and announcements
- **Gallery**: Upload and organize photos
- **Pages**: Edit page content

See \`ADMIN_GUIDE.md\` for detailed instructions.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The site will automatically redeploy when you push changes to your repository.

## Customization

### Colors

Edit the color palette in \`app/globals.css\`:
- Primary: Warm coral/peach
- Secondary: Soft mint green
- Accent: Soft sky blue

### Fonts

Change fonts in \`app/layout.tsx\` by importing different Google Fonts.

### Content

All text content can be edited through Sanity CMS without code changes.

## Support

- **Setup Issues**: See \`SANITY_SETUP.md\`
- **Admin Help**: See \`ADMIN_GUIDE.md\`
- **Technical Support**: Contact your developer

## License

Copyright © 2025 Little Sprouts Kindergarten. All rights reserved.
