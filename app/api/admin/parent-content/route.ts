import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import {
  PARENT_UPLOAD_PREFIX,
  SCHEDULE_ICONS,
  isParentCategory,
  type ParentCategory,
  type ParentItem,
} from "@/lib/parent-content"

export const dynamic = "force-dynamic"

const MAX_LENGTH = 2000
const COLUMNS = "id, category, title, subtitle, content, icon, file_url, slug, order_index"

/** Storage path of a file uploaded through the parents admin, or null for any other URL. */
function uploadedPath(fileUrl: string | null | undefined): string | null {
  if (!fileUrl) return null
  const marker = `/${DOCUMENTS_BUCKET}/${PARENT_UPLOAD_PREFIX}`
  const index = fileUrl.indexOf(marker)
  return index === -1 ? null : decodeURIComponent(fileUrl.slice(index + `/${DOCUMENTS_BUCKET}/`.length))
}

const text = (value: unknown) => (typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "")

/** Validates and normalises the editable fields for a category. Returns an error message or the fields. */
function cleanFields(category: ParentCategory, body: Record<string, unknown>) {
  const fields = {
    title: text(body.title),
    subtitle: text(body.subtitle) || null,
    content: text(body.content),
    icon: text(body.icon) || null,
    file_url: text(body.file_url) || null,
  }

  if ([fields.title, fields.subtitle ?? "", fields.content].some((v) => v.length > MAX_LENGTH)) {
    return { error: `Текстът е твърде дълъг (максимум ${MAX_LENGTH} знака).` }
  }
  if (category !== "setting" && !fields.title) return { error: "Попълнете заглавие / име." }
  if ((category === "schedule_group" || category === "schedule_nursery" || category === "setting") && !fields.content) {
    return { error: "Попълнете текста." }
  }
  if (fields.icon && !(SCHEDULE_ICONS as readonly string[]).includes(fields.icon)) {
    return { error: "Невалидна икона." }
  }
  if (fields.file_url && !/^(\/documents\/|https:\/\/)/.test(fields.file_url)) {
    return { error: "Невалиден файл." }
  }
  return { fields }
}

// GET: every item, including the page settings.
export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  const { data, error } = await auth.supabase
    .from("parent_content")
    .select(COLUMNS)
    .order("category")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("Loading parent content failed:", error.message)
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 })
  }
  return NextResponse.json(data ?? [])
}

// POST: add an item at the end of its list.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const body = await request.json().catch(() => ({}))
  if (!isParentCategory(body.category) || body.category === "setting") {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 })
  }
  const cleaned = cleanFields(body.category, body)
  if ("error" in cleaned) return NextResponse.json({ error: cleaned.error }, { status: 400 })

  const { data: last } = await supabase
    .from("parent_content")
    .select("order_index")
    .eq("category", body.category)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data, error } = await supabase
    .from("parent_content")
    .insert({
      ...cleaned.fields,
      category: body.category,
      slug: `${body.category}-${randomUUID()}`,
      order_index: (last?.order_index ?? -1) + 1,
      published: true,
    })
    .select(COLUMNS)
    .single()

  if (error) {
    console.error("Adding parent content failed:", error.message)
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
  return NextResponse.json(data)
}

// PUT: update one item's fields.
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const body = await request.json().catch(() => ({}))
  if (typeof body.id !== "string") return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { data: existing } = await supabase.from("parent_content").select(COLUMNS).eq("id", body.id).maybeSingle<ParentItem>()
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const cleaned = cleanFields(existing.category, body)
  if ("error" in cleaned) return NextResponse.json({ error: cleaned.error }, { status: 400 })

  // Settings keep their admin label as the title.
  const fields = existing.category === "setting" ? { content: cleaned.fields.content } : cleaned.fields

  const { data, error } = await supabase
    .from("parent_content")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", body.id)
    .select(COLUMNS)
    .single()

  if (error) {
    console.error("Updating parent content failed:", error.message)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }

  // A replaced upload is no longer used anywhere.
  const oldPath = uploadedPath(existing.file_url)
  if (oldPath && existing.file_url !== data.file_url) {
    await supabase.storage.from(DOCUMENTS_BUCKET).remove([oldPath])
  }

  return NextResponse.json(data)
}

// DELETE ?id=…: remove one item (page settings can't be deleted).
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { data: existing } = await supabase.from("parent_content").select(COLUMNS).eq("id", id).maybeSingle<ParentItem>()
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (existing.category === "setting") return NextResponse.json({ error: "Settings can't be deleted" }, { status: 400 })

  const { error } = await supabase.from("parent_content").delete().eq("id", id)
  if (error) {
    console.error("Deleting parent content failed:", error.message)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }

  const oldPath = uploadedPath(existing.file_url)
  if (oldPath) await supabase.storage.from(DOCUMENTS_BUCKET).remove([oldPath])

  return NextResponse.json({ success: true })
}
