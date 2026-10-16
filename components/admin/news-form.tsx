"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { X } from "lucide-react"

interface NewsFile {
  id: string
  file_name: string
  file_url: string
}

interface NewsFormProps {
  post?: {
    id: string
    title: string
    content: string
    is_active: boolean
    news_date: string
    news_hour: string
    from_text: string
    description: string
  }
}

export default function NewsForm({ post }: NewsFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [files, setFiles] = useState<NewsFile[]>([])
  const [teamMembers, setTeamMembers] = useState<Array<{ id: string; name: string }>>([])
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    description: post?.description || "",
    is_active: post?.is_active ?? true,
    news_date: post?.news_date || new Date().toISOString().split("T")[0],
    news_hour: post?.news_hour || "09:00",
    from_text: post?.from_text || "",
  })

  useEffect(() => {
    fetchTeamMembers()
    if (post?.id) {
      fetchNewsFiles()
    }
  }, [])

  async function fetchTeamMembers() {
    try {
      const { data, error } = await supabase.from("team_members").select("id, name").order("name")
      if (error) {
        console.error("Error fetching team members:", error)
        return
      }
      setTeamMembers(data || [])
    } catch (error) {
      console.error("Exception fetching team members:", error)
    }
  }

  async function fetchNewsFiles() {
    const { data } = await supabase.from("news_files").select("id, file_name, file_url").eq("news_id", post?.id)
    setFiles(data || [])
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !post?.id) return

    setUploadingFile(true)
    try {
      const fileName = `news/${post.id}/${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from("files").upload(fileName, file)

      if (error) throw error

      const { data: publicUrl } = supabase.storage.from("files").getPublicUrl(fileName)

      const { error: dbError } = await supabase.from("news_files").insert({
        news_id: post.id,
        file_name: file.name,
        file_url: publicUrl.publicUrl,
        file_size: file.size,
      })

      if (dbError) throw dbError

      await fetchNewsFiles()
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Error uploading file. Please try again.")
    } finally {
      setUploadingFile(false)
    }
  }

  async function deleteFile(fileId: string) {
    try {
      const { error } = await supabase.from("news_files").delete().eq("id", fileId)
      if (error) throw error
      await fetchNewsFiles()
    } catch (error) {
      console.error("Error deleting file:", error)
      alert("Error deleting file.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        title: formData.title,
        content: formData.content,
        description: formData.description,
        is_active: formData.is_active,
        news_date: formData.news_date,
        news_hour: formData.news_hour,
        from_text: formData.from_text,
      }

      if (post) {
        const { error } = await supabase.from("news_posts").update(submitData).eq("id", post.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("news_posts").insert([submitData])
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
        <div className="flex items-center gap-2">
          <Checkbox
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
          />
          <Label htmlFor="is_active" className="cursor-pointer">
            Активна новина
          </Label>
        </div>

        <div>
          <Label htmlFor="title">Заглавие *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Введете заглавието на новината"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="news_date">Дата *</Label>
            <Input
              id="news_date"
              type="date"
              value={formData.news_date}
              onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="news_hour">Час *</Label>
            <Input
              id="news_hour"
              type="time"
              value={formData.news_hour}
              onChange={(e) => setFormData({ ...formData, news_hour: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="from_text">От (Отговорен) *</Label>
          <select
            id="from_text"
            value={formData.from_text}
            onChange={(e) => setFormData({ ...formData, from_text: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            required
          >
            <option value="">Изберете член на персонала</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="description">Описание *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Кратко описание на новината"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Пълно съдържание *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Пълното съдържание на новината"
            rows={8}
            required
          />
        </div>

        {post && (
          <div>
            <Label>Прикачени файлове</Label>
            <div className="space-y-3">
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                      <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex-1">
                        {file.file_name}
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteFile(file.id)}
                        className="ml-2 text-destructive hover:bg-destructive/10 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploadingFile}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {uploadingFile && <p className="text-sm text-muted-foreground">Зареждане на файл...</p>}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Запазване..." : post ? "Обновяване" : "Създаване"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/news")}>
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
