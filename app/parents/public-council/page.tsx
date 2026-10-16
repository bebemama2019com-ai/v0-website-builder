import type { Metadata } from "next"
import PublicCouncilContent from "@/components/parents/public-council-content"
import { getParentItems, settingValue } from "@/lib/parent-content-server"

export const metadata: Metadata = {
  title: "Обществен съвет - ДГ 202",
  description: "Обществен съвет към Детска градина 202 – членове и документи",
}

export default async function PublicCouncilPage() {
  const items = await getParentItems(["council_member", "council_reserve", "council_document", "setting"] as const)
  return (
    <PublicCouncilContent
      regularMembers={items.council_member}
      reserveMembers={items.council_reserve}
      documents={items.council_document}
      intro={settingValue(items.setting, "council_intro")}
    />
  )
}
