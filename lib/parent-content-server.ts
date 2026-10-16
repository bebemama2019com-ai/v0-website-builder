import { unstable_rethrow } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { getDocumentByType, getDocumentUrl } from "@/lib/documents"
import {
  PARENT_SETTINGS,
  defaultItems,
  type ParentCategory,
  type ParentItem,
  type ParentSettingKey,
} from "@/lib/parent-content"

/**
 * Items of the given categories, in admin-defined order.
 * Falls back to the original content only if the database can't be read.
 */
export async function getParentItems<C extends ParentCategory>(
  categories: readonly C[],
): Promise<Record<C, ParentItem[]>> {
  const result = Object.fromEntries(categories.map((c) => [c, [] as ParentItem[]])) as Record<C, ParentItem[]>

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from("parent_content")
      .select("id, category, title, subtitle, content, icon, file_url, slug, order_index")
      .in("category", categories as readonly string[])
      .eq("published", true)
      .order("order_index", { ascending: true })

    if (error) throw error
    for (const row of (data ?? []) as ParentItem[]) result[row.category as C].push(row)
    return result
  } catch (error) {
    unstable_rethrow(error)
    console.error("Loading parent content failed:", error)
    for (const c of categories) result[c] = defaultItems(c)
    return result
  }
}

/** Value of a page setting, e.g. the school-year badge on the daily schedule. */
export function settingValue(settings: ParentItem[], key: ParentSettingKey): string {
  return settings.find((s) => s.slug === key)?.content ?? PARENT_SETTINGS[key].default
}

/** Download URL of a registered document (lib/documents.ts), or null when it isn't published. */
export async function getPublishedDocumentUrl(type: string): Promise<string | null> {
  const entry = getDocumentByType(type)
  if (!entry) return null
  try {
    const supabase = await createServerClient()
    const { data } = await supabase.from("documents").select("file_path").eq("document_type", type).maybeSingle()
    return data ? getDocumentUrl(entry, data.file_path) : null
  } catch (error) {
    unstable_rethrow(error)
    console.error("Loading document failed:", error)
    return `/documents/${entry.file}`
  }
}
