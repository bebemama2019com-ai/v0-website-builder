import { uploadedImagePath } from "@/lib/uploaded-images"

/**
 * Validates the image_url sent with a news post.
 * Returns null for "no image", the URL if it is an image uploaded from the admin panel,
 * or undefined if it is anything else (rejected).
 */
export function cleanNewsImageUrl(value: unknown): string | null | undefined {
  if (value === undefined || value === null || value === "") return null
  if (typeof value !== "string") return undefined
  return uploadedImagePath(value, "news") ? value : undefined
}
