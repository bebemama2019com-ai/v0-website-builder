"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Trash2 } from "lucide-react"
import { getDocumentByType, getDocumentUrl } from "@/lib/documents"
import { DocumentHeaderEditor, type DocumentPageInfo } from "@/components/admin/document-header-editor"

interface DocumentItemProps {
  documentType: string
  displayName: string
  currentFile?: {
    id: string
    file_name: string
    file_path: string
    file_size: number
    updated_at: string
  }
  onFileUploaded: () => void
  /** The public page this document appears on, for editing its header text */
  page?: DocumentPageInfo
  onPageSaved?: () => void
}

export default function DocumentUploadItem({
  documentType,
  displayName,
  currentFile,
  onFileUploaded,
  page,
  onPageSaved,
}: DocumentItemProps) {
  const entry = getDocumentByType(documentType)
  const downloadUrl = entry && currentFile ? getDocumentUrl(entry, currentFile.file_path) : undefined
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validExtensions = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validExtensions.includes(file.type)) {
      alert("Само PDF, DOC и DOCX файлове са позволени!")
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Файлът е твърде голям! Максимален размер: 50MB")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", documentType)

      const response = await fetch("/api/admin/upload-document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      onFileUploaded()
    } catch (error) {
      console.error("Error uploading file:", error)
      const errorMsg = error instanceof Error ? error.message : String(error)
      alert(`Грешка при зареждане на файл: ${errorMsg}`)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete() {
    if (!currentFile) return
    if (!confirm("Сигурни ли сте, че искате да изтриете този файл?")) return

    try {
      const response = await fetch("/api/admin/delete-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentType }),
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      onFileUploaded()
    } catch (error) {
      console.error("Error deleting file:", error)
      alert("Грешка при изтриване на файл.")
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{displayName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {currentFile ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
              <div className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">Качена версия:</div>
              <div className="text-sm text-muted-foreground">
                <p className="font-mono truncate">{currentFile.file_name}</p>
                <p className="text-xs mt-1">
                  Размер: {(currentFile.file_size / 1024 / 1024).toFixed(2)} MB • Обновлено:{" "}
                  {new Date(currentFile.updated_at).toLocaleDateString("bg-BG")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Изтегли
                </a>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Изтрий
              </Button>
            </div>

            <div className="border-t pt-4">
              <label className="block">
                <div className="text-sm font-medium mb-3">Замени с нов файл:</div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center py-4">Все още няма качен документ</p>
            <label className="block">
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />
            </label>
            <p className="text-xs text-muted-foreground text-center">PDF, DOC или DOCX • Макс. 50MB</p>
          </div>
        )}

        {page && (
          <div className="mt-4 border-t pt-4 space-y-2">
            <DocumentHeaderEditor page={page} onSaved={onPageSaved ?? (() => {})} />
            {page.isCustom && page.updatedAt && (
              <p className="text-xs text-muted-foreground text-center">
                Текстът е редактиран на {new Date(page.updatedAt).toLocaleDateString("bg-BG")}
              </p>
            )}
          </div>
        )}

        {uploading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Зареждане...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
