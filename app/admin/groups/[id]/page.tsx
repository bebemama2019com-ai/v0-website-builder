"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function GroupPage() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Redirect to edit page when accessing group directly
    if (params.id) {
      router.push(`/admin/groups/${params.id}/edit`)
    }
  }, [params.id, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Пренасочване...</p>
    </div>
  )
}
