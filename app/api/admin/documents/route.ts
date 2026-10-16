import { requireAdmin } from "@/lib/supabase/require-admin"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Full document records for the admin panel.
export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const { data: documents, error } = await auth.supabase
      .from("documents")
      .select("id, document_type, file_name, file_path, file_size, updated_at")
      .order("document_type", { ascending: true })

    if (error) throw error
    return NextResponse.json(documents || [])
  } catch (error) {
    console.error("Admin documents query failed:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
