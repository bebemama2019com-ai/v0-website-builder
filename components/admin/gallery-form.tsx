"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"

export default function GalleryForm() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "classroom",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("gallery_images").insert([formData])

      if (error) throw error

      router.push("/admin/gallery")
      router.refresh()
    } catch (error) {
      console.error("Error saving gallery image:", error)
      alert("Error saving gallery image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">Image URL *</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
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
            <option value="classroom">Classroom</option>
            <option value="outdoor">Outdoor Play</option>
            <option value="activities">Activities</option>
            <option value="events">Events</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/gallery")}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
