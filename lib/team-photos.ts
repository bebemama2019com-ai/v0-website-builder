import { DOCUMENTS_BUCKET } from "@/lib/documents"

// Team member photos uploaded from the admin panel live in the public "documents" bucket under this prefix.
export const TEAM_PHOTO_PREFIX = "uploads/team/"

/** Storage path of a photo uploaded through the admin panel, or null for any other URL (e.g. /team/*.jpg). */
export function teamPhotoStoragePath(url: string | null | undefined): string | null {
  if (!url) return null
  const marker = `/${DOCUMENTS_BUCKET}/${TEAM_PHOTO_PREFIX}`
  const index = url.indexOf(marker)
  return index === -1 ? null : decodeURIComponent(url.slice(index + `/${DOCUMENTS_BUCKET}/`.length).split("?")[0])
}
