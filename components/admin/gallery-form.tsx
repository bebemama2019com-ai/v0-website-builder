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
    category: "group1",
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
      console.error("Грешка при запазване на снимка:", error)
      alert("Грешка при запазване на снимка. Моля, опитайте отново.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Заглавие *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">URL на снимка *</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
          />
          <p className="text-sm text-muted-foreground mt-1">Въведете директен URL към снимка</p>
        </div>

        <div>
          <Label htmlFor="category">Категория *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="group1">Група 1</option>
            <option value="group2">Група 2</option>
            <option value="group3">Група 3</option>
            <option value="group4">Група 4</option>
            <option value="dod">ДОД</option>
            <option value="events">События</option>
            <option value="activities">Дейности</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Запазване..." : "Създай"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/gallery")}>
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
