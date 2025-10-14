import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import TeamForm from "@/components/admin/team-form"

export default async function NewTeamMemberPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("user_id", user.id).single()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Add Team Member</h1>
        <TeamForm />
      </div>
    </div>
  )
}
