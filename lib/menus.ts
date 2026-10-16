// Weekly menu files: one row per menu type in `weekly_menu_files`, holding the current
// menu and the one before it. The PDFs live in the public `menu-files` storage bucket.

export const MENU_BUCKET = "menu-files"

export const MENU_TYPES = ["kindergarten", "nursery"] as const
export type MenuType = (typeof MENU_TYPES)[number]

export function isMenuType(value: unknown): value is MenuType {
  return typeof value === "string" && (MENU_TYPES as readonly string[]).includes(value)
}

export interface MenuFileRow {
  id: string
  menu_type: MenuType
  file_name: string
  file_url: string
  file_size: number | null
  updated_at: string
  previous_file_name: string | null
  previous_file_url: string | null
  previous_file_size: number | null
  previous_updated_at: string | null
}

/** Storage path of a file in the menu bucket, taken from its public URL. */
export function menuStoragePath(fileUrl: string | null | undefined): string | null {
  if (!fileUrl) return null
  const marker = `/${MENU_BUCKET}/`
  const index = fileUrl.indexOf(marker)
  if (index === -1) return null
  return decodeURIComponent(fileUrl.slice(index + marker.length).split("?")[0])
}
