import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Newspaper, ImageIcon, LogOut } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  // Get counts
  const { count: teamCount } = await supabase.from("team_members").select("*", { count: "exact", head: true })

  const { count: newsCount } = await supabase.from("news_posts").select("*", { count: "exact", head: true })

  const { count: galleryCount } = await supabase.from("gallery_images").select("*", { count: "exact", head: true })
  const { count: documentsCount } = await supabase.from("documents").select("*", { count: "exact", head: true })
  const { count: parentsCount } = await supabase.from("parent_content").select("*", { count: "exact", head: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your kindergarten website content</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamCount || 0}</div>
              <p className="text-xs text-muted-foreground">Total staff members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News Posts</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{galleryCount || 0}</div>
              <p className="text-xs text-muted-foreground">Total photos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              {/* Placeholder icon for documents */}
              <div className="h-4 w-4 text-muted-foreground">📄</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Normative documents and budget files</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">For Parents</CardTitle>
              {/* Placeholder icon for parents */}
              <div className="h-4 w-4 text-muted-foreground">👨‍👩‍👧‍👦</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parentsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Parent information and resources</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage staff profiles and information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/team">
                <Button className="w-full">Manage Team</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>News & Events</CardTitle>
              <CardDescription>Create and edit blog posts and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/news">
                <Button className="w-full">Manage News</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Upload and organize photos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/gallery">
                <Button className="w-full">Manage Gallery</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Manage normative documents and budget files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{documentsCount || 0}</div>
              <Link href="/admin/documents">
                <Button className="w-full">Manage Documents</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>For Parents</CardTitle>
              <CardDescription>Manage parent information and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{parentsCount || 0}</div>
              <Link href="/admin/parents">
                <Button className="w-full">Manage Content</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
