import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"

export default async function AdminDocumentsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const { data: documents } = await supabase.from("documents").select("*").order("order_index", { ascending: true })

  const normativeDocs = documents?.filter((doc) => doc.category === "normative") || []
  const budgetDocs = documents?.filter((doc) => doc.category === "budget") || []

  const budgetByQuarter = {
    Q1: budgetDocs.filter((doc) => doc.quarter === "Q1"),
    Q2: budgetDocs.filter((doc) => doc.quarter === "Q2"),
    Q3: budgetDocs.filter((doc) => doc.quarter === "Q3"),
    Q4: budgetDocs.filter((doc) => doc.quarter === "Q4"),
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на документи</h1>
            </div>
            <Link href="/admin/documents/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави документ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Нормативна уредба</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {normativeDocs.map((doc) => (
                <Card key={doc.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                      {doc.description && <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>}
                      <p className="text-xs text-muted-foreground mb-4">
                        {doc.file_type.toUpperCase()} • {(doc.file_size / 1024).toFixed(0)} KB
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/admin/documents/${doc.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4 mr-1" />
                            Редактирай
                          </Button>
                        </Link>
                        <form action={`/api/admin/documents/${doc.id}/delete`} method="POST">
                          <Button variant="destructive" size="sm" type="submit">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Изтрий
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {normativeDocs.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Все още няма нормативни документи</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Бюджет</h2>
            <div className="space-y-6">
              {(["Q1", "Q2", "Q3", "Q4"] as const).map((quarter) => (
                <div key={quarter}>
                  <h3 className="text-xl font-semibold mb-3">
                    {quarter === "Q1" && "Първо тримесечие (Q1)"}
                    {quarter === "Q2" && "Второ тримесечие (Q2)"}
                    {quarter === "Q3" && "Трето тримесечие (Q3)"}
                    {quarter === "Q4" && "Четвърто тримесечие (Q4)"}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {budgetByQuarter[quarter].map((doc) => (
                      <Card key={doc.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                            {doc.description && <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>}
                            <p className="text-xs text-muted-foreground mb-4">
                              {doc.file_type.toUpperCase()} • {(doc.file_size / 1024).toFixed(0)} KB
                            </p>
                            <div className="flex gap-2">
                              <Link href={`/admin/documents/${doc.id}/edit`}>
                                <Button variant="outline" size="sm">
                                  <Pencil className="w-4 h-4 mr-1" />
                                  Редактирай
                                </Button>
                              </Link>
                              <form action={`/api/admin/documents/${doc.id}/delete`} method="POST">
                                <Button variant="destructive" size="sm" type="submit">
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Изтрий
                                </Button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {budgetByQuarter[quarter].length === 0 && (
                    <p className="text-center text-muted-foreground py-4 text-sm">
                      Все още няма документи за това тримесечие
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
