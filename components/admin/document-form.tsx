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

interface DocumentFormProps {
  document?: {
    id: string
    title: string
    description?: string
    category: string
    file_url: string
    file_type: string
    file_size: number
    order_index: number
  }
}

export default function DocumentForm({ document }: DocumentFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: document?.title || "",
    description: document?.description || "",
    category: document?.category || "normative",
    file_url: document?.file_url || "",
    file_type: document?.file_type || "pdf",
    file_size: document?.file_size || 0,
    order_index: document?.order_index || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (document) {
        const { error } = await supabase.from("documents").update(formData).eq("id", document.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("documents").insert([formData])
        if (error) throw error
      }

      router.push("/admin/documents")
      router.refresh()
    } catch (error) {
      console.error("Грешка при запазване на документ:", error)
      alert("Грешка при запазване на документ. Моля, опитайте отново.")
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
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
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
            <option value="normative">Нормативна уредба</option>
            <option value="budget">Бюджет</option>
          </select>
        </div>

        <div>
          <Label htmlFor="file_url">URL на файл *</Label>
          <Input
            id="file_url"
            type="url"
            value={formData.file_url}
            onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
            placeholder="https://example.com/document.pdf"
            required
          />
          <p className="text-sm text-muted-foreground mt-1">Въведете директен URL към документа</p>
        </div>

        <div>
          <Label htmlFor="file_type">Тип файл *</Label>
          <Input
            id="file_type"
            value={formData.file_type}
            onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
            placeholder="pdf"
            required
          />
        </div>

        <div>
          <Label htmlFor="file_size">Размер на файл (KB) *</Label>
          <Input
            id="file_size"
            type="number"
            value={formData.file_size}
            onChange={(e) => setFormData({ ...formData, file_size: Number.parseInt(e.target.value) })}
            required
          />
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
            {loading ? "Запазване..." : document ? "Актуализирай" : "Създай"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/documents")}>
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
