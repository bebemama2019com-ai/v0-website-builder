import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import TeamForm from "@/components/admin/team-form"
import Link from "next/link"

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
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

  const { data: member } = await supabase.from("team_members").select("*").eq("id", params.id).single()

  if (!member) {
    redirect("/admin/team")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/admin/team" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← Назад към екипа
        </Link>
        <h1 className="text-3xl font-bold mb-8">Редактирай член на екипа</h1>
        <TeamForm member={member} />
      </div>
    </div>
  )
}
