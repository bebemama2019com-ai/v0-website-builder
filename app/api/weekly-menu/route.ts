import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 5

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("weekly_menu_files").select("*").order("menu_type")

    if (error) {
      console.error("Error fetching menu files:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Menu files API error:", error)
    return NextResponse.json({ error: "Failed to fetch menu files" }, { status: 500 })
  }
}
