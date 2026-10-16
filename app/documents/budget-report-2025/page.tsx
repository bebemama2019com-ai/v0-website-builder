import type { Metadata } from "next"
import { DocumentPage } from "@/components/document-page"
import { Banknote } from "lucide-react"

export const metadata: Metadata = {
  title: "Отчет Бюджет 2025 - ДГ 202",
  description: "Финансов отчет и анализ на бюджета за 2025 година в ДГ 202",
}

export default function BudgetReport2025Page() {
  return (
    <DocumentPage
      title="Отчет Бюджет 2025"
      subtitle="Финансов отчет и анализ на разходите за 2025 година"
      pageKey="budget-report-2025"
      pdfPath="/documents/otchet-byudzhet-2025.pdf"
      icon={Banknote}
      sections={[
        {
          title: "Финансово резюме",
          content: [
            "Отчетът представя детайлния преглед на финансовата дейност на детската градина за 2025 година.",
            "Включва информация за получените приходи, направени разходи и финансовата позиция на учреждението.",
            "Документът е достъпен за родители и заинтересовани лица чрез обществения съвет.",
          ],
        },
      ]}
    />
  )
}
