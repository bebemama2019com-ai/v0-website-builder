"use client"

import { useRef, useState } from "react"
import { Bold, Italic, Pencil, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RichText } from "@/components/rich-text"
import { HEADER_FIELD_LIMIT, type DocumentPageHeader } from "@/lib/document-pages"

export interface DocumentPageInfo {
  key: string
  title: string
  defaults: DocumentPageHeader
  current: DocumentPageHeader
  isCustom: boolean
  updatedAt: string | null
}

const FIELDS: { name: keyof DocumentPageHeader; label: string; rows: number }[] = [
  { name: "orderInfo", label: "Заглавие (удебелен ред)", rows: 2 },
  { name: "orderDetails", label: "Описание / основание", rows: 4 },
  { name: "approvedBy", label: "Подпис (курсивен ред)", rows: 2 },
]

/** Wraps the selected text in a textarea with a marker such as ** or *. */
function wrapSelection(textarea: HTMLTextAreaElement, marker: string, onChange: (value: string) => void) {
  const { selectionStart: start, selectionEnd: end, value } = textarea
  const selected = value.slice(start, end) || "текст"
  const next = value.slice(0, start) + marker + selected + marker + value.slice(end)
  onChange(next)
  requestAnimationFrame(() => {
    textarea.focus()
    textarea.setSelectionRange(start + marker.length, start + marker.length + selected.length)
  })
}

function FormattedField({
  label,
  rows,
  value,
  onChange,
}: {
  label: string
  rows: number
  value: string
  onChange: (value: string) => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const format = (marker: string) => ref.current && wrapSelection(ref.current, marker, onChange)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>{label}</Label>
        <div className="flex gap-1">
          <Button type="button" variant="outline" size="sm" onClick={() => format("**")} title="Удебелен (Ctrl+B)">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => format("*")} title="Курсив (Ctrl+I)">
            <Italic className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Textarea
        ref={ref}
        rows={rows}
        value={value}
        maxLength={HEADER_FIELD_LIMIT}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (!(e.ctrlKey || e.metaKey)) return
          if (e.key === "b" || e.key === "B") {
            e.preventDefault()
            format("**")
          } else if (e.key === "i" || e.key === "I") {
            e.preventDefault()
            format("*")
          }
        }}
      />
    </div>
  )
}

export function DocumentHeaderEditor({ page, onSaved }: { page: DocumentPageInfo; onSaved: () => void }) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<DocumentPageHeader>(page.current)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleOpenChange(next: boolean) {
    if (next) {
      setValues(page.current)
      setError(null)
    }
    setOpen(next)
  }

  async function save() {
    if (FIELDS.some((f) => !values[f.name].trim())) {
      setError("Попълнете и трите полета.")
      return
    }
    setSaving(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/document-pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: page.key, ...values }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.error || "Save failed")
      }
      setOpen(false)
      onSaved()
    } catch (err) {
      setError(`Грешка при запазване: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setSaving(false)
    }
  }

  async function resetToDefault() {
    if (!window.confirm("Да се върне ли първоначалният текст на страницата?")) return
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/document-pages?pageKey=${encodeURIComponent(page.key)}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Reset failed")
      setOpen(false)
      onSaved()
    } catch {
      setError("Грешка при връщане на първоначалния текст.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Pencil className="mr-2 h-4 w-4" />
          Редактирай текста на страницата
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{page.title}</DialogTitle>
          <DialogDescription>
            Текстът в карето в началото на страницата. Маркирайте думи и натиснете B или I за удебелен или курсив.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {FIELDS.map((field) => (
            <FormattedField
              key={field.name}
              label={field.label}
              rows={field.rows}
              value={values[field.name]}
              onChange={(value) => setValues((prev) => ({ ...prev, [field.name]: value }))}
            />
          ))}

          <div className="space-y-2">
            <Label>Преглед</Label>
            <div className="rounded-lg border bg-card p-5">
              <p className="mb-1 text-lg font-semibold">
                <RichText text={values.orderInfo} />
              </p>
              <p className="text-muted-foreground">
                <RichText text={values.orderDetails} />
              </p>
              <p className="mt-2 text-sm italic text-muted-foreground">
                <RichText text={values.approvedBy} />
              </p>
            </div>
          </div>

          {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          {page.isCustom ? (
            <Button type="button" variant="ghost" onClick={resetToDefault} disabled={saving}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Върни първоначалния текст
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Отказ
            </Button>
            <Button type="button" onClick={save} disabled={saving}>
              {saving ? "Запазване..." : "Запази"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
