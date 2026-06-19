"use client"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import DocumentUploadItem from "@/components/admin/document-upload-item"
import { useState, useEffect } from "react"

// List of all documents from the screenshot
const DOCUMENT_TYPES = [
  { id: "budget", label: "Отчет Бюджет 2025" },
  { id: "eco-education", label: "Програма екологично възпитание" },
  { id: "data-protection", label: "Външни правила за защита на личните данни" },
  { id: "annual-plan", label: "Годишен План 2025/2026" },
  { id: "program-system", label: "Програмна Система" },
  { id: "admission-rules", label: "Правилник за пропускателния режим" },
  { id: "terror-protocol", label: "Правила за действие при тероризм" },
  { id: "bdp-program", label: "План-Програма БДП" },
  { id: "risk-mechanism", label: "Механизъм за дете в риск" },
  { id: "ethics-code-general", label: "Етичен кодекс за работа с деца" },
  { id: "ethics-code-dg202", label: "Етичен Кодекс ДГ 202" },
  { id: "adaptation-model", label: "Модел за адаптация" },
]

export default function DocumentsManagementPage() {
  const [documents, setDocuments] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [])

  async function fetchDocuments() {
    try {
      // Fetch all documents from the API
      const response = await fetch("/api/admin/documents")
      const data = await response.json()

      // Create a map of document_type -> document
      const docMap = {}
      data.forEach((doc: any) => {
        docMap[doc.document_type] = doc
      })
      setDocuments(docMap)
    } catch (error) {
      console.error("[v0] Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Зареждане...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад към таблото
          </Link>
          <h1 className="text-3xl font-bold mt-2">Управление на документи</h1>
          <p className="text-muted-foreground mt-1">Качете PDF или DOCX файлове за всяка категория документи</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Нормативна уредба</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DOCUMENT_TYPES.map((docType) => (
                <DocumentUploadItem
                  key={docType.id}
                  documentType={docType.id}
                  displayName={docType.label}
                  currentFile={documents[docType.id]}
                  onFileUploaded={fetchDocuments}
                />
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 mt-8">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Информация</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>✓ Поддържани формати: PDF и DOCX</li>
              <li>✓ Максимален размер: 50MB</li>
              <li>✓ При качване на нов файл, старият ще бъде автоматично изтрит</li>
              <li>✓ Всяка категория може да има само един документ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
