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

interface TeamFormProps {
  member?: {
    id: string
    name: string
    role: string
    bio: string
    image_url?: string
    order_position: number
  }
}

export default function TeamForm({ member }: TeamFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    bio: member?.bio || "",
    image_url: member?.image_url || "",
    order_position: member?.order_position || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (member) {
        // Update existing member
        const { error } = await supabase.from("team_members").update(formData).eq("id", member.id)

        if (error) throw error
      } else {
        // Create new member
        const { error } = await supabase.from("team_members").insert([formData])

        if (error) throw error
      }

      router.push("/admin/team")
      router.refresh()
    } catch (error) {
      console.error("Error saving team member:", error)
      alert("Error saving team member. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="role">Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
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
          <p className="text-sm text-muted-foreground mt-1">Enter a direct URL to an image</p>
        </div>

        <div>
          <Label htmlFor="order_position">Display Order</Label>
          <Input
            id="order_position"
            type="number"
            value={formData.order_position}
            onChange={(e) => setFormData({ ...formData, order_position: Number.parseInt(e.target.value) })}
          />
          <p className="text-sm text-muted-foreground mt-1">Lower numbers appear first</p>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : member ? "Update" : "Create"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
