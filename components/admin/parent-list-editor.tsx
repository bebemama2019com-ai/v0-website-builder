"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, FileText, Pencil, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  SCHEDULE_ICONS,
  SCHEDULE_ICON_LABELS,
  type ParentCategory,
  type ParentItem,
  type ScheduleIcon,
} from "@/lib/parent-content"

type FieldName = "title" | "subtitle" | "content" | "icon" | "file_url"

export interface FieldConfig {
  name: FieldName
  label: string
  kind: "text" | "textarea" | "icon" | "file"
  required?: boolean
  placeholder?: string
}

type Draft = Record<FieldName, string>

const emptyDraft = (): Draft => ({ title: "", subtitle: "", content: "", icon: "sun", file_url: "" })
const toDraft = (item: ParentItem): Draft => ({
  title: item.title,
  subtitle: item.subtitle ?? "",
  content: item.content,
  icon: item.icon ?? "sun",
  file_url: item.file_url ?? "",
})

async function request(url: string, init: RequestInit) {
  const response = await fetch(url, init)
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || "Грешка")
  return result
}

function fileLabel(url: string) {
  if (!url) return ""
  return url.startsWith("/documents/") ? url.replace("/documents/", "") : "Качен файл"
}

function ItemForm({
  fields,
  draft,
  setDraft,
  saving,
  onSave,
  onCancel,
}: {
  fields: FieldConfig[]
  draft: Draft
  setDraft: (d: Draft) => void
  saving: boolean
  onSave: () => void
  onCancel: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function upload(file: File) {
    setUploading(true)
    setUploadError(null)
    try {
      const body = new FormData()
      body.append("file", file)
      const result = await request("/api/admin/parent-content/upload", { method: "POST", body })
      setDraft({ ...draft, file_url: result.url })
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : String(err))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label>
            {field.label}
            {field.required && " *"}
          </Label>
          {field.kind === "text" && (
            <Input
              value={draft[field.name]}
              placeholder={field.placeholder}
              onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
            />
          )}
          {field.kind === "textarea" && (
            <Textarea
              rows={3}
              value={draft[field.name]}
              placeholder={field.placeholder}
              onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
            />
          )}
          {field.kind === "icon" && (
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={draft.icon}
              onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            >
              {SCHEDULE_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {SCHEDULE_ICON_LABELS[icon as ScheduleIcon]}
                </option>
              ))}
            </select>
          )}
          {field.kind === "file" && (
            <div className="space-y-2">
              {draft.file_url && (
                <a
                  href={draft.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary underline"
                >
                  <FileText className="h-4 w-4" />
                  {fileLabel(draft.file_url)}
                </a>
              )}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed p-3 text-sm hover:border-primary">
                <Upload className="h-4 w-4" />
                {uploading ? "Качване..." : draft.file_url ? "Замени файла" : "Качи файл (PDF, DOC, DOCX)"}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) upload(file)
                    e.target.value = ""
                  }}
                />
              </label>
              {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving || uploading}>
          Отказ
        </Button>
        <Button type="button" onClick={onSave} disabled={saving || uploading}>
          {saving ? "Запазване..." : "Запази"}
        </Button>
      </div>
    </div>
  )
}

/** Editable, reorderable list of one parent_content category. */
export function ParentListEditor({
  category,
  heading,
  description,
  addLabel,
  fields,
  items,
  onChanged,
  summary,
}: {
  category: ParentCategory
  heading: string
  description?: string
  addLabel: string
  fields: FieldConfig[]
  items: ParentItem[]
  onChanged: () => Promise<void> | void
  /** How an item is shown in the list */
  summary: (item: ParentItem) => { primary: string; secondary?: string }
}) {
  const [editingId, setEditingId] = useState<string | "new" | null>(null)
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function startEdit(item?: ParentItem) {
    setError(null)
    setEditingId(item ? item.id : "new")
    setDraft(item ? toDraft(item) : emptyDraft())
  }

  async function save() {
    const missing = fields.find((f) => f.required && !draft[f.name].trim())
    if (missing) {
      setError(`Попълнете „${missing.label}“.`)
      return
    }
    setSaving(true)
    setError(null)
    try {
      const payload = Object.fromEntries(fields.map((f) => [f.name, draft[f.name]]))
      if (editingId === "new") {
        await request("/api/admin/parent-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, ...payload }),
        })
      } else {
        await request("/api/admin/parent-content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        })
      }
      setEditingId(null)
      await onChanged()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: ParentItem) {
    if (!window.confirm(`Да се изтрие ли „${summary(item).primary}“?`)) return
    setError(null)
    try {
      await request(`/api/admin/parent-content?id=${encodeURIComponent(item.id)}`, { method: "DELETE" })
      await onChanged()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const ids = items.map((i) => i.id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    setError(null)
    try {
      await request("/api/admin/parent-content/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, ids }),
      })
      await onChanged()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <div className="space-y-2">
        {items.map((item, index) =>
          editingId === item.id ? (
            <ItemForm
              key={item.id}
              fields={fields}
              draft={draft}
              setDraft={setDraft}
              saving={saving}
              onSave={save}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <Card key={item.id}>
              <CardContent className="flex items-start gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{summary(item).primary}</p>
                  {summary(item).secondary && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">{summary(item).secondary}</p>
                  )}
                  {item.file_url && (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-primary underline"
                    >
                      <FileText className="h-3 w-3" />
                      {fileLabel(item.file_url)}
                    </a>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="sm" onClick={() => move(index, -1)} disabled={index === 0} title="Нагоре">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    title="Надолу"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => startEdit(item)} title="Редактирай">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => remove(item)} title="Изтрий">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ),
        )}
        {items.length === 0 && editingId !== "new" && (
          <p className="py-4 text-center text-sm text-muted-foreground">Няма добавени елементи</p>
        )}
      </div>

      {editingId === "new" ? (
        <ItemForm
          fields={fields}
          draft={draft}
          setDraft={setDraft}
          saving={saving}
          onSave={save}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <Button variant="outline" onClick={() => startEdit()} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      )}
    </div>
  )
}

/** A single editable page setting (e.g. the school-year badge). */
export function ParentSettingEditor({ item, onChanged }: { item: ParentItem; onChanged: () => Promise<void> | void }) {
  const [value, setValue] = useState(item.content)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      await request("/api/admin/parent-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, title: item.title, content: value }),
      })
      setMessage({ ok: true, text: "Запазено" })
      await onChanged()
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : String(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{item.title}</Label>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={save} disabled={saving || !value.trim() || value === item.content}>
          {saving ? "Запазване..." : "Запази"}
        </Button>
      </div>
      {message && <p className={`text-sm ${message.ok ? "text-green-700" : "text-destructive"}`}>{message.text}</p>}
    </div>
  )
}
