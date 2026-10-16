import { unstable_rethrow } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { getDocumentPage, type DocumentPageHeader } from "@/lib/document-pages"

/**
 * The header text for a document page: the admin's edited version if there is one,
 * otherwise the default from lib/document-pages.ts.
 */
export async function getDocumentPageHeader(key: string): Promise<DocumentPageHeader> {
  const page = getDocumentPage(key)
  if (!page) throw new Error(`Unknown document page: ${key}`)

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from("document_page_content")
      .select("order_info, order_details, approved_by")
      .eq("page_key", key)
      .maybeSingle()

    if (data) {
      return {
        orderInfo: data.order_info,
        orderDetails: data.order_details,
        approvedBy: data.approved_by,
      }
    }
  } catch (error) {
    unstable_rethrow(error) // let Next.js handle its own control-flow errors
    console.error("Loading document page text failed:", error)
  }

  return page.defaults
}
