"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Trash2, Upload } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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
}

export default function DocumentUploadItem({ documentType, displayName, currentFile, onFileUploaded }: DocumentItemProps) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validExtensions = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!validExtensions.includes(file.type)) {
      alert("Само PDF и DOCX файлове са позволени!")
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Файлът е твърде голям! Максимален размер: 50MB")
      return
    }

    setUploading(true)
    try {
      // If there's an existing file, delete it
      if (currentFile?.file_path) {
        console.log("[v0] Deleting existing file:", currentFile.file_path)
        await supabase.storage.from("documents").remove([currentFile.file_path])
      }

      // Upload new file
      const fileName = `${documentType}/${Date.now()}-${file.name}`
      console.log("[v0] Uploading file to:", fileName)
      const { error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

      if (uploadError) {
        console.error("[v0] Storage upload error:", uploadError)
        throw uploadError
      }

      console.log("[v0] File uploaded successfully")

      // Update or create document record
      if (currentFile) {
        console.log("[v0] Updating document record:", currentFile.id)
        const { error: updateError } = await supabase
          .from("documents")
          .update({
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentFile.id)

        if (updateError) {
          console.error("[v0] Database update error:", updateError)
          throw updateError
        }
      } else {
        console.log("[v0] Creating or updating document record for type:", documentType)
        
        // Try to insert first
        const { error: insertError } = await supabase.from("documents").insert({
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
        }).select()

        if (insertError) {
          console.log("[v0] Insert failed (likely duplicate), attempting update:", insertError.code)
          
          // If insert fails due to unique constraint, try to update
          if (insertError.code === "23505") {
            const { error: updateError } = await supabase
              .from("documents")
              .update({
                file_name: file.name,
                file_path: fileName,
                file_size: file.size,
                updated_at: new Date().toISOString(),
              })
              .eq("document_type", documentType)

            if (updateError) {
              console.error("[v0] Database update error:", updateError)
              throw updateError
            }
            console.log("[v0] Document updated successfully")
          } else {
            console.error("[v0] Database insert error:", insertError)
            console.error("[v0] Insert error code:", insertError.code)
            console.error("[v0] Insert error details:", insertError.details)
            throw insertError
          }
        } else {
          console.log("[v0] Document inserted successfully")
        }
      }

      console.log("[v0] Upload complete, calling onFileUploaded")
      onFileUploaded()
    } catch (error) {
      console.error("[v0] Error uploading file:", error)
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
      // Delete from storage
      await supabase.storage.from("documents").remove([currentFile.file_path])

      // Delete from database
      await supabase.from("documents").delete().eq("id", currentFile.id)

      onFileUploaded()
    } catch (error) {
      console.error("[v0] Error deleting file:", error)
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
                <a href={currentFile.file_path.replace(/^documents\//, "")} target="_blank" rel="noopener noreferrer">
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
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />
            </label>
            <p className="text-xs text-muted-foreground text-center">PDF или DOCX • Макс. 50MB</p>
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
