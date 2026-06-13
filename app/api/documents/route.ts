import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Revalidate every 5 seconds for fresh data
export const revalidate = 5

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("documents").select("*").order("order_index", { ascending: true })

    if (error) {
      console.error("[SERVER][v0] Supabase query error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[SERVER][v0] Documents API error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
