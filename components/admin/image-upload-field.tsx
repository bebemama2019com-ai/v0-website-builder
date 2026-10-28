"use client"

import { useState } from "react"
import { ImagePlus, Trash2, User, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { IMAGE_TYPES, MAX_IMAGE_SIZE, type ImageFolder } from "@/lib/uploaded-images"

/**
 * Image picker for admin forms: shows a preview with upload / replace / remove buttons.
 * Uploading stores the file right away and calls onUploaded(url); the form saves the URL.
 * The form is responsible for cleaning up uploads that end up not being saved.
 */
export function ImageUploadField({
  folder,
  value,
  onChange,
  onUploaded,
  label = "Снимка",
  hint,
  shape = "round",
  disabled,
  onUploadingChange,
}: {
  folder: ImageFolder
  value: string
  onChange: (url: string) => void
  /** Called with every newly uploaded URL, so the form can track (and later clean up) uploads */
  onUploaded?: (url: string) => void
  label?: string
  hint?: string
  shape?: "round" | "wide"
  disabled?: boolean
  onUploadingChange?: (uploading: boolean) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setBusy = (busy: boolean) => {
    setUploading(busy)
    onUploadingChange?.(busy)
  }

  async function upload(file: File | undefined) {
    if (!file) return
    if (!IMAGE_TYPES[file.type]) {
      setError("Позволени са само JPG, PNG и WebP снимки.")
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Снимката е по-голяма от 5MB.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const body = new FormData()
      body.append("file", file)
      body.append("folder", folder)
      const response = await fetch("/api/admin/upload-image", { method: "POST", body })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || "Грешка при качване")
      onUploaded?.(result.url)
      onChange(result.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  const preview =
    shape === "round" ? (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <User className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
    ) : (
      <div className="flex aspect-video w-full max-w-sm shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
    )

  return (
    <div>
      <Label>{label}</Label>
      <div className={`mt-2 flex gap-4 ${shape === "round" ? "items-center" : "flex-col items-start"}`}>
        {preview}
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" disabled={uploading || disabled} asChild>
            <label className="cursor-pointer">
              <ImagePlus className="mr-2 h-4 w-4" />
              {uploading ? "Качване..." : value ? "Смени снимката" : "Качи снимка"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploading || disabled}
                onChange={(e) => {
                  upload(e.target.files?.[0])
                  e.target.value = ""
                }}
              />
            </label>
          </Button>
          {value && (
            <Button type="button" variant="ghost" disabled={uploading || disabled} onClick={() => onChange("")}>
              <Trash2 className="mr-2 h-4 w-4" />
              Премахни
            </Button>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{hint ?? "JPG, PNG или WebP, до 5MB."}</p>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}
