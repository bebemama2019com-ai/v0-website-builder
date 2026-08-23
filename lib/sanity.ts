import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "p75xja6f",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})

// Type definitions for Sanity content
export interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  image: {
    asset: {
      url: string
    }
  }
  order: number
}

export interface NewsPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  publishedAt: string
  image: {
    asset: {
      url: string
    }
  }
  category: string
}

export interface GalleryImage {
  _id: string
  title: string
  image: {
    asset: {
      url: string
    }
  }
  category: string
  date: string
}

export interface PageContent {
  _id: string
  title: string
  slug: {
    current: string
  }
  content: any[]
  heroImage?: {
    asset: {
      url: string
    }
  }
}
