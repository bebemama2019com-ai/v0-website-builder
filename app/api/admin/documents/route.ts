import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const revalidate = 5

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: documents, error } = await supabase
      .from("documents")
      .select("file_path")
      .order("document_type", { ascending: true })

    if (error) throw error

    return NextResponse.json(documents || [])
  } catch (error) {
    console.error("[v0] Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
