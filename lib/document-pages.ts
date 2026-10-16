// The editable "header" box on each /documents/* page: a heading line, a details line,
// and an italic signature line. The text below is the default; admins can override it
// from the admin panel, and the override is stored in the `document_page_content` table.
//
// The fields support simple formatting: **bold**, *italic* and line breaks (see components/rich-text.tsx).

export interface DocumentPageHeader {
  orderInfo: string
  orderDetails: string
  approvedBy: string
}

export interface DocumentPageEntry {
  /** URL slug under /documents/ and the key in `document_page_content` */
  key: string
  /** Page title, used to label the page in the admin panel */
  title: string
  /** Document types (see lib/documents.ts) whose files appear on this page */
  documentTypes: string[]
  defaults: DocumentPageHeader
}

export const DOCUMENT_PAGES: DocumentPageEntry[] = [
  {
    // Shown on /parents/daily-schedule
    key: "daily-schedule",
    title: "Дневен режим",
    documentTypes: ["daily-schedule"],
    defaults: {
      orderInfo: "Заповед № 18/14.10.2025 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 10.10.2025г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
  {
    key: "strategia-za-razvitie",
    title: "Стратегия за развитие 2025-2030",
    documentTypes: ["development-strategy"],
    defaults: {
      orderInfo: "Заповед № 16/14.10.2025 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 10.10.2025г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
  {
    key: "budget-report-2025",
    title: "Отчет Бюджет 2025",
    documentTypes: ["budget"],
    defaults: {
      orderInfo: "Отчет за периода 01.01.2025 - 31.12.2025",
      orderDetails: "Детайлен преглед на финансовите приходи и разходи на ДГ 202.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "budget-report-2026",
    title: "Отчет Бюджет 2026",
    documentTypes: ["budget-2026-q1", "budget-2026-q2", "budget-2026-q3", "budget-2026-q4"],
    defaults: {
      orderInfo: "Отчети по тримесечия за 2026 година",
      orderDetails: "Детайлни преглед на финансовите приходи и разходи на ДГ 202 разделени по тримесечия на 2026 година.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "budget",
    title: "План за действие и финансиране 2025-2026",
    documentTypes: ["action-plan"],
    defaults: {
      orderInfo: "Протокол № 1 от 10.10.2025 г.",
      orderDetails: "Планът за действие и финансиране е приет на заседание на педагогически съвет.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "data-protection-rules",
    title: "Вътрешни правила за защита на личните данни",
    documentTypes: ["data-protection"],
    defaults: {
      orderInfo: "Приета от педагогически съвет",
      orderDetails: "Документът определя принципите и процедурите за защита на личните данни в детската градина, в съответствие с GDPR и българското законодателство.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "eco-education-program",
    title: "Програма екологично възпитание",
    documentTypes: ["eco-education"],
    defaults: {
      orderInfo: "Програма за 2025/2026 година",
      orderDetails: "Комплексна програма за екологичното възпитание на децата в детската градина.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "etichen-kodeks-dg202",
    title: "Етичен Кодекс ДГ 202",
    documentTypes: ["ethics-code-dg202"],
    defaults: {
      orderInfo: "Заповед № 17/14.10.2025 г.",
      orderDetails: "Етичният кодекс на ДГ № 202 е разработен от директора на ДГ, комисията от педагогически специалисти и представители на обществения съвет към детската градина в съответствие с изискванията на чл. 269, ал.1, т.11 от ЗПУО.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "etichen-kodeks-rabota-s-detsa",
    title: "Етичен кодекс за работа с деца",
    documentTypes: ["ethics-code-general"],
    defaults: {
      orderInfo: "Заповед № 16/15.10.2025 г.",
      orderDetails: "Разработен от директора на ДГ, комисията от педагогически специалисти и представители на обществения съвет към детската градина в съответствие с изискванията на чл. 269, ал.1, т.11 от ЗПУО.",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "godishen-plan",
    title: "Годишен План 2025/2026",
    documentTypes: ["annual-plan"],
    defaults: {
      orderInfo: "Заповед № 27/10.10.2025 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 10.10.2025г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
  {
    key: "mehanizam-dete-v-risk",
    title: "Механизъм за дете в риск",
    documentTypes: ["risk-mechanism"],
    defaults: {
      orderInfo: "Механизъм за взаимодействие при сигнал за дете, жертва на насилие или в риск от насилие",
      orderDetails: "ДГ № 202, гр. София",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "model-adaptatsia",
    title: "Модел за адаптация на децата",
    documentTypes: ["adaptation-model"],
    defaults: {
      orderInfo: "Заповед № 29/15.10.2025 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 10.10.2025г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
  {
    key: "plan-programa-bdp",
    title: "План-Програма БДП",
    documentTypes: ["bdp-program"],
    defaults: {
      orderInfo: "План-програма за безопасност на движението по пътищата",
      orderDetails: "Планът е разработен в изпълнение на Националната стратегия за безопасност на движението по пътищата в Република България 2021-2030 г.",
      approvedBy: "ДГ № 202, Столична община - Район \"Младост\"",
    },
  },
  {
    key: "pravila-terorizam",
    title: "Правила за действие при тероризъм",
    documentTypes: ["terror-protocol"],
    defaults: {
      orderInfo: "Правила за действие при злонамерени анонимни телефонни съобщения",
      orderDetails: "На основание на чл. 21 т. 11 от Закона на Министерството на вътрешните работи и чл. 12 от Устройствения правилник на МОН",
      approvedBy: "ДГ № 202, Столична община - Район \"Младост\"",
    },
  },
  {
    key: "pravilnik-vatreshen-trudov-red",
    title: "Правилник за вътрешния трудов ред",
    documentTypes: ["internal-labor-rules"],
    defaults: {
      orderInfo: "Заповед № 106/21.09.2026 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 10.10.2025г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
  {
    key: "pravilnik-propuskatelen-rezhim",
    title: "Правилник за пропускателния режим",
    documentTypes: ["admission-rules"],
    defaults: {
      orderInfo: "Заповед № 24/14.10.2025 г.",
      orderDetails: "Утвърден от директора на ДГ № 202",
      approvedBy: "Петя Янкова - Директор на ДГ № 202",
    },
  },
  {
    key: "programna-sistema",
    title: "Програмна Система",
    documentTypes: ["program-system"],
    defaults: {
      orderInfo: "Заповед № 104/21.09.2026 г.",
      orderDetails: "На основание чл. 259 ал.1 от ЗПУО, Наредба № 5/03.06.2016г. за предучилищно образование и решение на ПС с Протокол № 1 от 16.09.2026г.",
      approvedBy: "Петя Янкова - ВрИД Директор на ДГ № 202",
    },
  },
]

export function getDocumentPage(key: string): DocumentPageEntry | undefined {
  return DOCUMENT_PAGES.find((p) => p.key === key)
}

/** The page that shows a given document type. */
export function getDocumentPageForType(type: string): DocumentPageEntry | undefined {
  return DOCUMENT_PAGES.find((p) => p.documentTypes.includes(type))
}

export const HEADER_FIELD_LIMIT = 2000
