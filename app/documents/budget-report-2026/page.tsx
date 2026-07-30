"use client"

import { useEffect, useState } from "react"
import { DocumentPageMulti } from "@/components/document-page-multi"
import { createClient } from "@/lib/supabase/client"

export default function BudgetReport2026Page() {
  const [files, setFiles] = useState<Array<{ name: string; path: string; description?: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const supabase = await createClient()
        
        // Fetch Q1 and Q2 2026 budget documents
        const { data: q1Data } = await supabase
          .from("documents")
          .select("file_name, file_path")
          .eq("document_type", "budget-2026-q1")
          .single()

        const { data: q2Data } = await supabase
          .from("documents")
          .select("file_name, file_path")
          .eq("document_type", "budget-2026-q2")
          .single()

        const filesList = []

        if (q1Data?.file_path) {
          const { data: publicUrl } = supabase.storage
            .from("documents")
            .getPublicUrl(q1Data.file_path)
          filesList.push({
            name: "Отчет за първо тримесечие 2026",
            path: publicUrl.publicUrl,
            description: "Финансов отчет за януари-март 2026",
          })
        }

        if (q2Data?.file_path) {
          const { data: publicUrl } = supabase.storage
            .from("documents")
            .getPublicUrl(q2Data.file_path)
          filesList.push({
            name: "Отчет за второ тримесечие 2026",
            path: publicUrl.publicUrl,
            description: "Финансов отчет за април-юни 2026",
          })
        }

        setFiles(filesList)
      } catch (error) {
        console.error("[v0] Error fetching documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Зареждане на документи...</p>
        </div>
      </>
    )
  }

  return (
    <DocumentPageMulti
      title="Отчет Бюджет 2026"
      subtitle="Финансови отчети и анализ на разходите за 2026 година"
      orderInfo="Отчети по тримесечия за 2026 година"
      orderDetails="Детайлни преглед на финансовите приходи и разходи на ДГ 202 разделени по тримесечия на 2026 година."
      approvedBy="Петя Янкова - Директор на ДГ № 202"
      files={files}
      sections={[
        {
          title: "Финансово резюме",
          content: [
            "Отчетът представя детайлния преглед на финансовата дейност на детската градина за 2026 година, разделен по тримесечия.",
            "Включва информация за получените приходи, направени разходи и финансовата позиция на учреждението във всяко тримесечие.",
            "Документите са достъпни за родители и заинтересовани лица чрез обществения съвет.",
          ],
        },
        {
          title: "Съдържание на отчетите",
          content: [
            "Всеки тримесечен отчет съдържа подробна информация за издържка, заплати, социални вноски и други финансови операции.",
            "Отчетите позволяват прозрачност в управлението на бюджета и финансовото планиране на учреждението.",
            "Данните в отчетите помагат на администрацията да взема информирани решения относно разходването на средства.",
          ],
        },
      ]}
    />
  )
}
