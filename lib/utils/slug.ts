// Bulgarian Cyrillic → Latin (Streamlined System, as used for Bulgarian place names).
const BG_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
  н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
  щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya", ё: "yo", ы: "y", э: "e",
}

/** URL-friendly slug from a (Bulgarian or English) title, e.g. "Покана за среща" → "pokana-za-sreshta". */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[а-яё]/g, (ch) => BG_TO_LATIN[ch] ?? "") // before NFKD, which would split й/ё
    .normalize("NFKD") // "№" → "No", "é" → "e" + accent
    .toLowerCase()
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9\s-]/g, "") // remove anything else
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "")
}

/**
 * A slug for `title` that no other row uses: "title", then "title-2", "title-3", …
 * `isTaken` checks whether a candidate is already used (by another row).
 */
export async function uniqueSlug(title: string, isTaken: (slug: string) => Promise<boolean>): Promise<string> {
  const base = generateSlug(title) || "novina"
  for (let n = 1; n <= 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`
    if (!(await isTaken(candidate))) return candidate
  }
  return `${base}-${Date.now()}`
}
