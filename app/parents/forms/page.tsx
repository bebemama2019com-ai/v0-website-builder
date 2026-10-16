import type { Metadata } from "next"
import FormsContent from "@/components/parents/forms-content"
import { getParentItems } from "@/lib/parent-content-server"

export const metadata: Metadata = {
  title: "Бланки и заявления - ДГ 202",
  description: "Необходимите документи и бланки за родителите в ДГ 202",
}

export default async function FormsPage() {
  const { form } = await getParentItems(["form"] as const)
  return <FormsContent forms={form} />
}
