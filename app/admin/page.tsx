import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Newspaper, ImageIcon, LogOut, AlertCircle, Calendar, UtensilsCrossed } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  // Get counts with error handling
  const { count: teamCount } = await supabase.from("team_members").select("*", { count: "exact", head: true })
  const { count: newsCount } = await supabase.from("news_posts").select("*", { count: "exact", head: true })
  const { count: galleryCount } = await supabase.from("gallery_images").select("*", { count: "exact", head: true })

  let documentsCount = 0
  let parentsCount = 0
  let groupsCount = 0
  let menusCount = 0
  let tablesExist = true

  try {
    const { count: docCount } = await supabase.from("documents").select("*", { count: "exact", head: true })
    documentsCount = docCount || 0
  } catch (error) {
    tablesExist = false
  }

  try {
    const { count: parentCount } = await supabase.from("parent_content").select("*", { count: "exact", head: true })
    parentsCount = parentCount || 0
  } catch (error) {
    tablesExist = false
  }

  try {
    const { count: grpCount } = await supabase.from("groups").select("*", { count: "exact", head: true })
    groupsCount = grpCount || 0
  } catch (error) {
    // Groups table doesn't exist yet
  }

  try {
    const { count: menuCount } = await supabase.from("weekly_menus").select("*", { count: "exact", head: true })
    menusCount = menuCount || 0
  } catch (error) {
    // Menus table doesn't exist yet
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Административен панел</h1>
            <p className="text-muted-foreground mt-1">Управление на съдържанието на уебсайта</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Изход
            </Button>
          </form>
        </div>

        {!tablesExist && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Необходима настройка</AlertTitle>
            <AlertDescription>
              Таблиците за Документи и За Родители трябва да бъдат създадени. Моля, изпълнете SQL скрипта{" "}
              <code className="bg-muted px-1 py-0.5 rounded">scripts/003_add_documents_and_parents_tables.sql</code> в
              Supabase SQL редактора или натиснете бутона Run до файла в v0.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Членове на екипа</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamCount || 0}</div>
              <p className="text-xs text-muted-foreground">Общо служители</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Новини</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Публикувани статии</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Галерия</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{galleryCount || 0}</div>
              <p className="text-xs text-muted-foreground">Общо снимки</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Документи</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">📄</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Нормативни документи и бюджет</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">За Родители</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">👨‍👩‍👧‍👦</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parentsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Информация и ресурси за родители</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Групи</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{groupsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Групи със седмични програми</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Седмични менюта</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menusCount || 0}</div>
              <p className="text-xs text-muted-foreground">Менюта за ясла и детската градина</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Групи и програми</CardTitle>
              <CardDescription>Управление на групи и седмични програми</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/groups">
                <Button className="w-full">Управление на групи</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Нашия екип</CardTitle>
              <CardDescription>Управление на профили и информация за персонала</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/team">
                <Button className="w-full">Управление на екипа</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Новини и събития</CardTitle>
              <CardDescription>Създаване и редактиране на публикации и съобщения</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/news">
                <Button className="w-full">Управление на новини</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Галерия</CardTitle>
              <CardDescription>Качване и организиране на снимки</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/gallery">
                <Button className="w-full">Управление на галерия</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Документи</CardTitle>
              <CardDescription>Управление на нормативни документи и бюджетни файлове</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/documents">
                <Button className="w-full">Управление на документи</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>За Родители</CardTitle>
              <CardDescription>Управление на информация и ресурси за родители</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/parents">
                <Button className="w-full">Управление на съдържание</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Седмични менюта</CardTitle>
              <CardDescription>Управление на менюта за ясла и детската градина</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/menus">
                <Button className="w-full">Управление на менюта</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
