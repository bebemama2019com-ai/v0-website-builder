import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function GroupPage(props: Props) {
  const params = await props.params
  redirect(`/admin/groups/${params.id}/edit`)
}
