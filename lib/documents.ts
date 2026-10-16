import { SUPABASE_URL } from "@/lib/supabase/config"

// Single source of truth for the administrative documents shown on /documents/*.
//
// Each entry ties together:
//   - `type`  : the `document_type` key stored in the `documents` table
//   - `label` : the name shown in the admin panel
//   - `file`  : the original PDF shipped in `public/documents/` (used as a fallback)
//
// A row in the `documents` table means "this document is published".
// Its `file_path` is either:
//   - a path starting with `uploads/` → a file an admin uploaded to the `documents` storage bucket
//   - anything else                  → the original static file in `public/documents/`

export const DOCUMENTS_BUCKET = "documents"
export const UPLOAD_PREFIX = "uploads/"

export interface DocumentEntry {
  type: string
  label: string
  file: string
}

export const DOCUMENTS: DocumentEntry[] = [
  { type: "action-plan", label: "План за действие и финансиране 2025-2026", file: "plan-deystvie-finansirane.pdf" },
  { type: "budget", label: "Отчет Бюджет 2025", file: "otchet-byudzhet-2025.pdf" },
  { type: "budget-2026-q1", label: "Отчет Бюджет 2026 - Първо тримесечие", file: "otchet-byudzhet-2026-q1.pdf" },
  { type: "budget-2026-q2", label: "Отчет Бюджет 2026 - Второ тримесечие", file: "otchet-byudzhet-2026-q2.pdf" },
  { type: "budget-2026-q3", label: "Отчет Бюджет 2026 - Трето тримесечие", file: "otchet-byudzhet-2026-q3.pdf" },
  { type: "budget-2026-q4", label: "Отчет Бюджет 2026 - Четвърто тримесечие", file: "otchet-byudzhet-2026-q4.pdf" },
  { type: "eco-education", label: "Програма екологично възпитание", file: "programa-ekologichno-vazpitanie.pdf" },
  {
    type: "data-protection",
    label: "Вътрешни правила за защита на личните данни",
    file: "vatureshni-pravila-zashtita-lichni-danni.pdf",
  },
  { type: "annual-plan", label: "Годишен план 2025/2026", file: "godishen-plan-2025-2026.pdf" },
  { type: "program-system", label: "Програмна система", file: "programna-sistema.pdf" },
  {
    type: "internal-labor-rules",
    label: "Правилник за вътрешния трудов ред",
    file: "pravilnik-vatreshen-trudov-red.pdf",
  },
  { type: "admission-rules", label: "Правилник за пропускателния режим", file: "pravilnik-propuskatelen-rezhim.pdf" },
  { type: "terror-protocol", label: "Правила за действие при тероризъм", file: "pravila-terorizam.pdf" },
  { type: "bdp-program", label: "План-програма БДП", file: "plan-programa-bdp.pdf" },
  { type: "risk-mechanism", label: "Механизъм за дете в риск", file: "mehanizam-dete-v-risk.pdf" },
  { type: "ethics-code-general", label: "Етичен кодекс за работа с деца", file: "etichen-kodeks-rabota-s-detsa.pdf" },
  { type: "ethics-code-dg202", label: "Етичен кодекс ДГ 202", file: "etichen-kodeks-dg202.pdf" },
  { type: "adaptation-model", label: "Модел за адаптация", file: "model-adaptatsia.pdf" },
]

export function getDocumentByType(type: string): DocumentEntry | undefined {
  return DOCUMENTS.find((d) => d.type === type)
}

/** Finds the entry for a public path such as "/documents/godishen-plan-2025-2026.pdf". */
export function getDocumentByPath(path: string): DocumentEntry | undefined {
  const fileName = path.split("/").pop()
  return DOCUMENTS.find((d) => d.file === fileName)
}

export function isUploadedPath(filePath: string): boolean {
  return filePath.startsWith(UPLOAD_PREFIX)
}

/** Public download URL for a published document row. */
export function getDocumentUrl(entry: DocumentEntry, filePath: string): string {
  if (isUploadedPath(filePath)) {
    const encoded = filePath.split("/").map(encodeURIComponent).join("/")
    return `${SUPABASE_URL}/storage/v1/object/public/${DOCUMENTS_BUCKET}/${encoded}`
  }
  return `/documents/${entry.file}`
}
