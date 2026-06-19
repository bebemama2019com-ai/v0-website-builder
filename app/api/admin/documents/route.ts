import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data: documents, error } = await supabase
      .from("documents")
      .select("id, document_type, file_name, file_path, file_size, updated_at")
      .order("document_type", { ascending: true })

    if (error) throw error

    return NextResponse.json(documents || [])
  } catch (error) {
    console.error("[v0] Error fetching admin documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
