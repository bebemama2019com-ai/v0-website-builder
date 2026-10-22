import { DOCUMENTS_BUCKET } from "@/lib/documents"

// Images uploaded from the admin panel (team photos, news images) live in the public
// "documents" bucket under uploads/<folder>/.
export const IMAGE_FOLDERS = { team: "uploads/team/", news: "uploads/news-images/" } as const
export type ImageFolder = keyof typeof IMAGE_FOLDERS

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export function isImageFolder(value: unknown): value is ImageFolder {
  return typeof value === "string" && value in IMAGE_FOLDERS
}

/** Storage path of an image uploaded through the admin panel, or null for any other URL (e.g. /team/*.jpg). */
export function uploadedImagePath(url: string | null | undefined, folder?: ImageFolder): string | null {
  if (!url) return null
  const prefixes = folder ? [IMAGE_FOLDERS[folder]] : Object.values(IMAGE_FOLDERS)
  for (const prefix of prefixes) {
    const marker = `/${DOCUMENTS_BUCKET}/${prefix}`
    const index = url.indexOf(marker)
    if (index !== -1) return decodeURIComponent(url.slice(index + `/${DOCUMENTS_BUCKET}/`.length).split("?")[0])
  }
  return null
}
