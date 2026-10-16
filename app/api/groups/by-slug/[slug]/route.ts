import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const slugToName: Record<string, string> = {
  "group-1": "Група 1",
  "group-2": "Група 2",
  "group-3": "Група 3",
  "group-4": "Група 4",
  dod: "ДОД",
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const supabase = await createClient()

    const groupName = slugToName[slug]

    if (!groupName) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 })
    }

    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select(`
        *,
        team_members:responsible_teacher_id (
          id,
          name,
          role,
          bio,
          image_url
        )
      `)
      .eq("name", groupName)
      .single()

    if (groupError) throw groupError

    // Fetch schedule for this group
    const { data: schedules, error: scheduleError } = await supabase
      .from("group_schedules")
      .select("*")
      .eq("group_id", group.id)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true })
      .order("order_index", { ascending: true })

    if (scheduleError) throw scheduleError

    return NextResponse.json({ ...group, schedules })
  } catch (error) {
    console.error("Error fetching group:", error)
    return NextResponse.json({ error: "Failed to fetch group" }, { status: 500 })
  }
}
