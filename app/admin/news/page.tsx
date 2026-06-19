"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, Save, X, Calendar, Clock, User, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { bg } from "date-fns/locale"

interface NewsPost {
  id: string
  title: string
  content: string
  news_date: string
  news_hour: string
  from_text: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function AdminNewsPage() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    news_date: format(new Date(), "yyyy-MM-dd"),
    news_hour: format(new Date(), "HH:mm"),
    from_text: "",
    is_active: true,
  })

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/news")
      if (!response.ok) throw new Error("Failed to fetch news")
      const data = await response.json()
      setNewsPosts(data)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Грешка при зареждане на новини")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      setSaving(true)
      setError(null)
      const method = editingId ? "PUT" : "POST"
      const endpoint = editingId ? `/api/admin/news/${editingId}` : "/api/admin/news"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save news")
      }

      await fetchNews()
      resetForm()
    } catch (err) {
      console.error("Error saving news:", err)
      setError(err instanceof Error ? err.message : "Грешка при запазване на новина")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Сигурни ли сте че искате да изтриете тази новина?")) return

    try {
      setError(null)
      const response = await fetch(`/api/admin/news/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete news")
      await fetchNews()
    } catch (err) {
      console.error("Error deleting news:", err)
      setError("Грешка при изтриване на новина")
    }
  }

  function handleEdit(post: NewsPost) {
    setFormData({
      title: post.title,
      content: post.content,
      news_date: post.news_date,
      news_hour: post.news_hour,
      from_text: post.from_text,
      is_active: post.is_active,
    })
    setEditingId(post.id)
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function resetForm() {
    setFormData({
      title: "",
      content: "",
      news_date: format(new Date(), "yyyy-MM-dd"),
      news_hour: format(new Date(), "HH:mm"),
      from_text: "",
      is_active: true,
    })
    setEditingId(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление на Новини</h1>
          <p className="text-muted-foreground mt-2">Създаване, редактиране и управление на новини</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Нова новина
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Form Section */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Редактирай новина" : "Нова новина"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Заглавие *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Заглавие на новина"
                className="mt-1"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content">Съдържание *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Пълното съдържание на новина"
                className="mt-1 h-32"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="news_date">Дата *</Label>
                <Input
                  id="news_date"
                  type="date"
                  value={formData.news_date}
                  onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="news_hour">Час *</Label>
                <Input
                  id="news_hour"
                  type="time"
                  value={formData.news_hour}
                  onChange={(e) => setFormData({ ...formData, news_hour: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="from_text">Автор / От кого</Label>
              <Input
                id="from_text"
                value={formData.from_text}
                onChange={(e) => setFormData({ ...formData, from_text: e.target.value })}
                placeholder="Администрация на ДГ 202"
                className="mt-1"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_active" className="mb-0">Публикувано</Label>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="outline" onClick={resetForm} disabled={saving}>
                <X className="mr-2 h-4 w-4" />
                Отмяна
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Запазване...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Запази
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Всички новини ({newsPosts.length})</h2>

        {loading ? (
          <Card>
            <CardContent className="pt-6 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Зареждане...</span>
            </CardContent>
          </Card>
        ) : newsPosts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Няма налични новини. {!isEditing && "Създайте първата новина!"}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {newsPosts.map((post) => (
              <Card key={post.id} className={post.is_active ? "" : "opacity-60"}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            post.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {post.is_active ? "Публикувано" : "Чернова"}
                        </span>
                      </div>
                      <CardDescription className="line-clamp-3 mt-2">{post.content}</CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        disabled={isEditing}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                        disabled={isEditing}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.news_date), "d MMM yyyy", { locale: bg })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.news_hour}
                    </div>
                    {post.from_text && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.from_text}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
