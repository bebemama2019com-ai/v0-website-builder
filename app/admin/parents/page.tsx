"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Clock, FileText, Users, UtensilsCrossed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DocumentUploadItem from "@/components/admin/document-upload-item"
import type { DocumentPageInfo } from "@/components/admin/document-header-editor"
import { ParentListEditor, ParentSettingEditor, type FieldConfig } from "@/components/admin/parent-list-editor"
import { SCHEDULE_ICON_LABELS, type ParentCategory, type ParentItem, type ScheduleIcon } from "@/lib/parent-content"

const SCHEDULE_FIELDS: FieldConfig[] = [
  { name: "title", label: "Час", kind: "text", required: true, placeholder: "напр. 8:50 - 9:15" },
  { name: "content", label: "Дейност", kind: "textarea", required: true },
  { name: "icon", label: "Икона", kind: "icon" },
]
const FILE_ITEM_FIELDS: FieldConfig[] = [
  { name: "title", label: "Заглавие", kind: "text", required: true },
  { name: "content", label: "Описание", kind: "textarea" },
  { name: "file_url", label: "Файл", kind: "file" },
]
const MEMBER_FIELDS: FieldConfig[] = [
  { name: "title", label: "Име", kind: "text", required: true },
  { name: "subtitle", label: "Роля", kind: "text", placeholder: "напр. Председател, Член" },
  { name: "content", label: "Описание", kind: "text", placeholder: "напр. Представител на родителите в ДГ № 202" },
]
const RESERVE_FIELDS: FieldConfig[] = [
  { name: "title", label: "Име", kind: "text", required: true },
  { name: "content", label: "Описание", kind: "text", placeholder: "напр. Представител на родителите" },
]

const scheduleSummary = (item: ParentItem) => ({
  primary: `${item.title} ч.`,
  secondary: `${item.content} · ${SCHEDULE_ICON_LABELS[item.icon as ScheduleIcon] ?? ""}`,
})
const titleSummary = (item: ParentItem) => ({ primary: item.title, secondary: item.content })
const memberSummary = (item: ParentItem) => ({
  primary: item.subtitle ? `${item.title} – ${item.subtitle}` : item.title,
  secondary: item.content,
})

export default function AdminParentsPage() {
  const [items, setItems] = useState<ParentItem[]>([])
  const [scheduleDoc, setScheduleDoc] = useState<any>(undefined)
  const [schedulePage, setSchedulePage] = useState<DocumentPageInfo | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/parent-content", { cache: "no-store" })
    if (!response.ok) throw new Error("Грешка при зареждане на съдържанието")
    setItems(await response.json())
  }, [])

  const loadScheduleDocument = useCallback(async () => {
    const [docs, pages] = await Promise.all([
      fetch("/api/admin/documents", { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/document-pages", { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])),
    ])
    setScheduleDoc(docs.find((d: any) => d.document_type === "daily-schedule"))
    setSchedulePage(pages.find((p: DocumentPageInfo & { key: string }) => p.key === "daily-schedule"))
  }, [])

  useEffect(() => {
    Promise.all([loadItems(), loadScheduleDocument()])
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false))
  }, [loadItems, loadScheduleDocument])

  const list = (category: ParentCategory) => items.filter((i) => i.category === category)
  const setting = (slug: string) => items.find((i) => i.category === "setting" && i.slug === slug)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Зареждане...</p>
      </div>
    )
  }

  const badge = setting("daily_schedule_badge")
  const councilIntro = setting("council_intro")

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад към таблото
          </Link>
          <h1 className="mt-2 text-3xl font-bold">Управление на съдържание за родители</h1>
          <p className="mt-1 text-muted-foreground">
            Страниците „Дневен режим“, „Бланки и заявления“ и „Обществен съвет“. Промените се виждат веднага на сайта.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl space-y-10 px-4 py-10">
        {error && <p className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</p>}

        <Card className="border-dashed">
          <CardContent className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
            <UtensilsCrossed className="h-5 w-5 shrink-0" />
            <span>
              Седмичното меню се управлява в{" "}
              <Link href="/admin/weekly-menu" className="text-primary underline">
                Управление на Седмично меню
              </Link>
              , а новините – в{" "}
              <Link href="/admin/news" className="text-primary underline">
                Новини
              </Link>
              .
            </span>
          </CardContent>
        </Card>

        {/* Daily schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="h-6 w-6 text-primary" />
              Дневен режим
            </CardTitle>
            <Link href="/parents/daily-schedule" target="_blank" className="text-sm text-primary underline">
              Виж страницата
            </Link>
          </CardHeader>
          <CardContent className="space-y-8">
            {badge && <ParentSettingEditor item={badge} onChanged={loadItems} />}

            <div className="max-w-md">
              <DocumentUploadItem
                documentType="daily-schedule"
                displayName="PDF документ и заповед"
                currentFile={scheduleDoc}
                onFileUploaded={loadScheduleDocument}
                page={schedulePage}
                onPageSaved={loadScheduleDocument}
              />
            </div>

            <ParentListEditor
              category="schedule_group"
              heading="Програма за градинска група"
              addLabel="Добави ред"
              fields={SCHEDULE_FIELDS}
              items={list("schedule_group")}
              onChanged={loadItems}
              summary={scheduleSummary}
            />
            <ParentListEditor
              category="schedule_nursery"
              heading="Програма за яслена група"
              addLabel="Добави ред"
              fields={SCHEDULE_FIELDS}
              items={list("schedule_nursery")}
              onChanged={loadItems}
              summary={scheduleSummary}
            />
          </CardContent>
        </Card>

        {/* Forms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Бланки и заявления
            </CardTitle>
            <Link href="/parents/forms" target="_blank" className="text-sm text-primary underline">
              Виж страницата
            </Link>
          </CardHeader>
          <CardContent>
            <ParentListEditor
              category="form"
              heading="Бланки"
              description="Всяка бланка се показва с бутони „Преглед“ и „Изтегляне“."
              addLabel="Добави бланка"
              fields={FILE_ITEM_FIELDS}
              items={list("form")}
              onChanged={loadItems}
              summary={titleSummary}
            />
          </CardContent>
        </Card>

        {/* Public council */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              Обществен съвет
            </CardTitle>
            <Link href="/parents/public-council" target="_blank" className="text-sm text-primary underline">
              Виж страницата
            </Link>
          </CardHeader>
          <CardContent className="space-y-8">
            {councilIntro && <ParentSettingEditor item={councilIntro} onChanged={loadItems} />}
            <ParentListEditor
              category="council_member"
              heading="Редовни членове"
              description="Първият член в списъка се показва като председател (оцветен)."
              addLabel="Добави член"
              fields={MEMBER_FIELDS}
              items={list("council_member")}
              onChanged={loadItems}
              summary={memberSummary}
            />
            <ParentListEditor
              category="council_reserve"
              heading="Резервни членове"
              addLabel="Добави резервен член"
              fields={RESERVE_FIELDS}
              items={list("council_reserve")}
              onChanged={loadItems}
              summary={titleSummary}
            />
            <ParentListEditor
              category="council_document"
              heading="Документи"
              addLabel="Добави документ"
              fields={FILE_ITEM_FIELDS}
              items={list("council_document")}
              onChanged={loadItems}
              summary={titleSummary}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
