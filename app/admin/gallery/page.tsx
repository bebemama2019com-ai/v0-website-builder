import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export default async function AdminGalleryPage() {
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

  const { data: galleryImages } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на галерия</h1>
            </div>
            <Link href="/admin/gallery/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави снимка
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages?.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <img src={image.image_url || "/placeholder.svg"} alt={image.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-1">{image.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{image.category}</p>
                <form action={`/api/admin/gallery/${image.id}/delete`} method="POST">
                  <Button variant="destructive" size="sm" className="w-full" type="submit">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Изтрий
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>

        {!galleryImages ||
          (galleryImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Все още няма снимки в галерията</p>
              <Link href="/admin/gallery/new">
                <Button>Добавете първата снимка</Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
