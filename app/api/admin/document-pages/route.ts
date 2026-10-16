import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENT_PAGES, HEADER_FIELD_LIMIT, getDocumentPage } from "@/lib/document-pages"

export const dynamic = "force-dynamic"

// GET: every document page with its current header text and whether it was edited.
export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  const { data, error } = await auth.supabase
    .from("document_page_content")
    .select("page_key, order_info, order_details, approved_by, updated_at")

  if (error) {
    console.error("Loading document page content failed:", error.message)
    return NextResponse.json({ error: "Failed to load page text" }, { status: 500 })
  }

  const byKey = new Map((data || []).map((row) => [row.page_key, row]))

  return NextResponse.json(
    DOCUMENT_PAGES.map((page) => {
      const row = byKey.get(page.key)
      return {
        key: page.key,
        title: page.title,
        documentTypes: page.documentTypes,
        defaults: page.defaults,
        current: row
          ? { orderInfo: row.order_info, orderDetails: row.order_details, approvedBy: row.approved_by }
          : page.defaults,
        isCustom: Boolean(row),
        updatedAt: row?.updated_at ?? null,
      }
    }),
  )
}

function cleanField(value: unknown): string | null {
  if (typeof value !== "string") return null
  const text = value.replace(/\r\n/g, "\n").trim()
  if (!text || text.length > HEADER_FIELD_LIMIT) return null
  return text
}

// PUT: save edited header text for one page.
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const body = await request.json()
    const page = typeof body.pageKey === "string" ? getDocumentPage(body.pageKey) : undefined
    const orderInfo = cleanField(body.orderInfo)
    const orderDetails = cleanField(body.orderDetails)
    const approvedBy = cleanField(body.approvedBy)

    if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 400 })
    if (!orderInfo || !orderDetails || !approvedBy) {
      return NextResponse.json(
        { error: `All three fields are required (max ${HEADER_FIELD_LIMIT} characters each)` },
        { status: 400 },
      )
    }

    const { error } = await auth.supabase.from("document_page_content").upsert(
      {
        page_key: page.key,
        order_info: orderInfo,
        order_details: orderDetails,
        approved_by: approvedBy,
        updated_at: new Date().toISOString(),
        updated_by: auth.user.id,
      },
      { onConflict: "page_key" },
    )

    if (error) {
      console.error("Saving document page content failed:", error.message)
      return NextResponse.json({ error: "Failed to save page text" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Document page content error:", error)
    return NextResponse.json({ error: "Failed to save page text" }, { status: 500 })
  }
}

// DELETE: go back to the default text for one page.
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  const pageKey = request.nextUrl.searchParams.get("pageKey")
  if (!pageKey || !getDocumentPage(pageKey)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 })
  }

  const { error } = await auth.supabase.from("document_page_content").delete().eq("page_key", pageKey)
  if (error) {
    console.error("Resetting document page content failed:", error.message)
    return NextResponse.json({ error: "Failed to reset page text" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
