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
    order_index: number
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
    order_index: member?.order_index || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (member) {
        const { error } = await supabase.from("team_members").update(formData).eq("id", member.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("team_members").insert([formData])
        if (error) throw error
      }

      router.push("/admin/team")
      router.refresh()

      // Force revalidation of team data on frontend
      fetch("/api/team", { cache: "no-store" })
    } catch (error) {
      console.error("Грешка при запазване на член на екипа:", error)
      alert("Грешка при запазване на член на екипа. Моля, опитайте отново.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Име *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="role">Длъжност *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="bio">Биография *</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">URL на снимка</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-sm text-muted-foreground mt-1">Въведете директен URL към снимка</p>
        </div>

        <div>
          <Label htmlFor="order_index">Ред на показване</Label>
          <Input
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value) })}
          />
          <p className="text-sm text-muted-foreground mt-1">По-малките числа се показват първи</p>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Запазване..." : member ? "Актуализирай" : "Създай"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
