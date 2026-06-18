"use client"

import { useState, useEffect } from "react"
import { uploadMenuFile } from "@/app/actions/upload-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Upload, Download, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface MenuFile {
  id: string
  menu_type: string
  file_name: string
  file_url: string
  file_size: number
  updated_at: string
}

const MENU_TYPES = [
  { id: "kindergarten", label: "Детска градина", description: "Възрастова група от 3 до 7 години" },
  { id: "nursery", label: "Ясла", description: "Възрастова група от 1 до 3 години" },
]

export default function AdminWeeklyMenuPage() {
  const supabase = createClient()
  const [files, setFiles] = useState<MenuFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  async function fetchFiles() {
    try {
      const { data, error: err } = await supabase
        .from("weekly_menu_files")
        .select("*")
        .order("menu_type")

      if (err) throw err
      setFiles(data || [])
    } catch (err) {
      setError("Грешка при зареждане на файлове")
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, menuType: string) {
    const file = e.target.files?.[0]
    
    if (!file) return

    // Validate PDF
    if (!file.name.endsWith(".pdf") || file.type !== "application/pdf") {
      setError("Само PDF файлове са позволени")
      e.target.value = ""
      return
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      setError("Файлът е твърде голям. Максимум 50MB.")
      e.target.value = ""
      return
    }

    setUploading(menuType)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("menuType", menuType)

      const result = await uploadMenuFile(formData)

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccess(`Файлът за ${menuType === "kindergarten" ? "детската градина" : "яслите"} беше успешно качен`)
      
      // Reset file input
      const fileInput = document.getElementById(`file-input-${menuType}`) as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }
      
      await fetchFiles()
    } catch (err) {
      let errorMsg = "Неизвестна грешка"
      if (err instanceof Error) {
        errorMsg = err.message
      }
      setError(`Грешка при качване на файл: ${errorMsg}`)
    } finally {
      setUploading(null)
    }
  }

  async function handleDeleteFile(menuType: string, fileUrl: string) {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете този файл?")) return

    try {
      // Delete from storage
      const fileName = fileUrl.split("/").pop()
      if (fileName) {
        await supabase.storage.from("menu-files").remove([fileName])
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from("weekly_menu_files")
        .delete()
        .eq("menu_type", menuType)

      if (deleteError) throw deleteError

      setSuccess("Файлът беше успешно изтрит")
      await fetchFiles()
    } catch (err) {
      setError("Грешка при изтриване на файл")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад към таблото
          </Link>
          <h1 className="text-3xl font-bold mt-2">Управление на Седмично меню</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">{success}</span>
          </div>
        )}

        {/* Menu Types Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {MENU_TYPES.map((menuType) => {
            const file = files.find((f) => f.menu_type === menuType.id)
            const isUploading = uploading === menuType.id

            return (
              <Card key={menuType.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{menuType.label}</span>
                    {file && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{menuType.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Current File */}
                  {file && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Текущ файл</p>
                        <p className="font-medium truncate">{file.file_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(file.file_size / 1024).toFixed(2)} KB • Обновлено:{" "}
                          {new Date(file.updated_at).toLocaleDateString("bg-BG")}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Изтегли
                          </a>
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFile(menuType.id, file.file_url)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Upload Input */}
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(e) => handleFileUpload(e, menuType.id)}
                      disabled={isUploading}
                      className="hidden"
                      id={`file-input-${menuType.id}`}
                    />

                    <label
                      htmlFor={`file-input-${menuType.id}`}
                      className={`block text-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        isUploading
                          ? "border-muted bg-muted/50 cursor-not-allowed"
                          : "border-input hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium text-sm">
                        {isUploading ? "Качване..." : file ? "Замени файл" : "Качи PDF файл"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF | Максимум 50MB</p>
                    </label>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Help Text */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">Информация</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Се приемат само PDF файлове</p>
            <p>• Максимален размер: 50MB</p>
            <p>• При качване на нов файл, старият файл ще бъде автоматично изтрит</p>
            <p>• Файловете ще бъдат достъпни за изтегляне от страницата "Седмично меню"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
