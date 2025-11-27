import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default async function AdminNewsPage() {
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

  const { data: newsPosts } = await supabase.from("news_posts").select("*").order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на новини и събития</h1>
            </div>
            <Link href="/admin/news/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави новина
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {newsPosts?.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex gap-6">
                {post.image_url && (
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(new Date(post.published_at), "MMMM d, yyyy")}
                      </p>
                      <p className="text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex gap-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs">
                            Препоръчано
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/news/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={`/api/admin/news/${post.id}/delete`} method="POST">
                        <Button variant="destructive" size="sm" type="submit">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!newsPosts ||
          (newsPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Все още няма новини</p>
              <Link href="/admin/news/new">
                <Button>Добавете първата новина</Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
