"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"

interface NewsFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image_url?: string
    category: string
    featured: boolean
    published_at: string
  }
}

export default function NewsForm({ post }: NewsFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image_url: post?.image_url || "",
    category: post?.category || "news",
    featured: post?.featured || false,
    published_at: post?.published_at || new Date().toISOString().split("T")[0],
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (post) {
        const { error } = await supabase.from("news_posts").update(formData).eq("id", post.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("news_posts").insert([formData])

        if (error) throw error
      }

      router.push("/admin/news")
      router.refresh()
    } catch (error) {
      console.error("Error saving news post:", error)
      alert("Error saving news post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="slug">URL Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
          <p className="text-sm text-muted-foreground mt-1">Auto-generated from title, but you can customize it</p>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt *</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="news">News</option>
            <option value="events">Events</option>
            <option value="announcements">Announcements</option>
          </select>
        </div>

        <div>
          <Label htmlFor="published_at">Publish Date *</Label>
          <Input
            id="published_at"
            type="date"
            value={formData.published_at}
            onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <Label htmlFor="featured">Featured Post</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : post ? "Update" : "Create"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/news")}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
