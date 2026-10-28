"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase/client"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { uploadedImagePath } from "@/lib/uploaded-images"
import { ImageUploadField } from "@/components/admin/image-upload-field"

interface TeamFormProps {
  member?: {
    id: string
    name: string
    role: string
    bio: string
    image_url?: string
    order_index: number
    category?: string
  }
}

export default function TeamForm({ member }: TeamFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  // Photos uploaded in this session but not (or no longer) saved, removed on save/cancel.
  const [pendingUploads, setPendingUploads] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    bio: member?.bio || "",
    image_url: member?.image_url || "",
    order_index: member?.order_index || 0,
    category: member?.category || "other",
  })

  const removeStoredPhotos = async (urls: (string | null | undefined)[]) => {
    const paths = urls.map((url) => uploadedImagePath(url, "team")).filter((p): p is string => Boolean(p))
    if (paths.length > 0) await supabase.storage.from(DOCUMENTS_BUCKET).remove(paths)
  }

  const handleCancel = async () => {
    await removeStoredPhotos(pendingUploads)
    router.push("/admin/team")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare form data - include category field
      const submitData = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        image_url: formData.image_url || null,
        order_index: formData.order_index,
        category: formData.category,
      }

      if (member) {
        const { error } = await supabase.from("team_members").update(submitData).eq("id", member.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("team_members").insert([submitData])
        if (error) throw error
      }

      // Clean up photos that are no longer used: the replaced one and any uploaded but not kept.
      const previous = member?.image_url
      await removeStoredPhotos([
        ...(previous && previous !== formData.image_url ? [previous] : []),
        ...pendingUploads.filter((url) => url !== formData.image_url),
      ])

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
          <Label htmlFor="role">Длъжност/Позиция *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="например: Учител, Директор, Счетоводител"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Категория *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pedagogical">Педагогически персонал</SelectItem>
              <SelectItem value="medical">Медицински специалисти</SelectItem>
              <SelectItem value="other">Друг персонал</SelectItem>
              <SelectItem value="security">Охрана</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Изберете групата, към която принадлежи членът на персонала</p>
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

        <ImageUploadField
          folder="team"
          value={formData.image_url}
          onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
          onUploaded={(url) => setPendingUploads((prev) => [...prev, url])}
          onUploadingChange={setUploading}
          hint="JPG, PNG или WebP, до 5MB. Най-добре квадратна снимка на лицето."
        />

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
          <Button type="submit" disabled={loading || uploading}>
            {loading ? "Запазване..." : member ? "Актуализирай" : "Създай"}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
