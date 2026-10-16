// Editable content of the "За родители" pages, stored in the `parent_content` table.
// One row per item; `category` says which list it belongs to and how its columns are used:
//
//   category           title         subtitle   content        icon   file_url
//   schedule_group     time          –          activity       icon   –
//   schedule_nursery   time          –          activity       icon   –
//   form               form title    –          description    –      PDF
//   council_member     name          role       description    –      –
//   council_reserve    name          –          description    –      –
//   council_document   doc title     –          description    –      PDF
//   setting            (key in slug) –          value          –      –
//
// The defaults below are the content the pages had before it became editable; they seed the
// table (scripts/018_parent_content_editable.sql) and are shown if the database can't be reached.

export const PARENT_CATEGORIES = [
  "schedule_group",
  "schedule_nursery",
  "form",
  "council_member",
  "council_reserve",
  "council_document",
  "setting",
] as const
export type ParentCategory = (typeof PARENT_CATEGORIES)[number]

export function isParentCategory(value: unknown): value is ParentCategory {
  return typeof value === "string" && (PARENT_CATEGORIES as readonly string[]).includes(value)
}

export const SCHEDULE_ICONS = ["sun", "coffee", "book", "utensils", "moon", "baby"] as const
export type ScheduleIcon = (typeof SCHEDULE_ICONS)[number]

export const SCHEDULE_ICON_LABELS: Record<ScheduleIcon, string> = {
  sun: "Слънце (игри, дейности)",
  coffee: "Чаша (закуска)",
  book: "Книга (занимания)",
  utensils: "Прибори (обяд)",
  moon: "Луна (сън)",
  baby: "Бебе (тоалет, грижи)",
}

export interface ParentItem {
  id: string
  category: ParentCategory
  title: string
  subtitle: string | null
  content: string
  icon: string | null
  file_url: string | null
  slug: string
  order_index: number
}

export type ParentItemInput = Omit<ParentItem, "id" | "slug">

/** Page settings (category "setting"), keyed by slug. */
export const PARENT_SETTINGS = {
  daily_schedule_badge: { label: "Дневен режим – учебна година (надпис над заглавието)", default: "Учебна 2025/2026 г." },
  council_intro: {
    label: "Обществен съвет – текст под заглавието",
    default: "Обществения съвет в ДГ № 202 за учебната 2025/2026г. с мандат 3 години",
  },
} as const
export type ParentSettingKey = keyof typeof PARENT_SETTINGS

type Seed = Omit<ParentItemInput, "order_index"> & { slug?: string }

const schedule = (category: ParentCategory, rows: [string, string, ScheduleIcon][]): Seed[] =>
  rows.map(([title, content, icon]) => ({ category, title, content, icon, subtitle: null, file_url: null }))

export const PARENT_DEFAULTS: Seed[] = [
  ...schedule("schedule_group", [
    ["7:00 - 8:30", "Прием на децата по групи; дейност по избор на децата; дейности, организирани от учителя; индивидуална работа и др.", "sun"],
    ["8:30 - 8:50", "Сутрешно раздвижване; дейности по избор", "sun"],
    ["8:50 - 9:15", "Сутрешна закуска", "coffee"],
    ["9:20 - 10:30", "Педагогически ситуации, творчески игри, подвижни игри, ателиета", "book"],
    ["10:30", "Подкрепителна закуска", "coffee"],
    ["10:40 - 11:50", "Педагогически ситуации; дейност по избор на децата; дейности, организирани от учителя, подвижни игри, игри на открито", "book"],
    ["12:00", "Обяд", "utensils"],
    ["12:30 - 13:00", "Подготовка за сън", "moon"],
    ["13:00 - 15:00", "Следобеден сън", "moon"],
    ["15:15 - 15:40", "Следобедна закуска", "coffee"],
    ["15:40 - 18:30", "Подвижни игри, педагогически ситуации; допълнителни дейности, дейност по избор на децата; дейности, организирани от учителя, игри на открито, изпращане на децата", "sun"],
  ]),
  ...schedule("schedule_nursery", [
    ["7:00 - 8:30", "Сутрешен прием. Дейности по избор на децата. Дейности, организирани от медицинската сестра (комуникативни игри за адаптация и социализиране)", "sun"],
    ["8:35 - 8:50", "Утринно раздвижване (гимнастика, музикално-подвижни игри и др.)", "sun"],
    ["8:55 - 9:15", "Подготовка за закуска. Закуска", "coffee"],
    ["9:15 - 9:30", "Тоалет (гърне, миене на ръце и др.)", "baby"],
    ["9:30 - 10:00", "Дейности с образователна цел организирани от мед. сестри - разказване на приказки, слушане на музика, заучаване на художествени текстове, пеене и танци, изобразителна дейност, модели за овладяване на навици за самообслужване, култура на поведение и др.", "book"],
    ["10:00 - 10:20", "Миене на ръце, подготовка и подкрепителна закуска (плод)", "coffee"],
    ["10:20 - 10:30", "Тоалет (гърне)", "baby"],
    ["10:30 - 11:20", "Игри и свободно реализирани дейности по избор (на открито или на закрито) - разходки, наблюдения, конструктивни и ролеви игри, музикално-подвижни игри и др. Дейности съобразно потребностите на децата", "sun"],
    ["11:25 - 11:45", "Прибиране в занимарнята, тоалет (гърне, миене на ръце и др.)", "baby"],
    ["11:50 - 12:20", "Подготовка за обяд. Обяд", "utensils"],
    ["12:20 - 15:30", "Тоалет (гърне), подготовка за следобедна почивка и сън", "moon"],
    ["15:30 - 16:00", "Следобеден тоалет (гърне, миене на ръце). Раздвижване (игри - подвижни, за раздвижване и емоционална нагласа)", "baby"],
    ["16:00 - 16:30", "Подготовка за следобедна закуска. Закуска", "coffee"],
    ["16:30 - 19:00", "Дейности, организирани от мед. спец. (на открито и закрито); игри и други свободно реализирани дейности - развлечения, театър, приказки, занимания на маси и др.", "sun"],
  ]),
  {
    category: "form",
    title: "Декларация за защита на личните данни",
    content: "Информирано писмено съгласие за обработване на лични данни на детето и родителя/родителите в ДГ № 202",
    file_url: "/documents/deklaracija-lichni-danni.pdf",
    subtitle: null,
    icon: null,
  },
  {
    category: "form",
    title: "Декларация за взимане на дете",
    content: "Декларация за правилата и отговорностите при взимане на детето от детската градина",
    file_url: "/documents/deklaracija-vzimane-na-dete.pdf",
    subtitle: null,
    icon: null,
  },
  ...(
    [
      ["Стефан Шабанов", "Председател", "Представител на родителите в ДГ № 202"],
      ["Елисавета Баджакова", "Член", "Представител на родителите в ДГ № 202"],
      ["Ивета Асенова", "Член", "Представител на родителите в ДГ № 202"],
      ["Цветелина Серафимова", "Член", "Представител на родителите в ДГ № 202"],
      ["Светлана Дякова", "Член", "Представител на финансиращия орган"],
    ] as const
  ).map(([title, subtitle, content]): Seed => ({ category: "council_member", title, subtitle, content, icon: null, file_url: null })),
  ...(
    [
      ["Вера Димитрова", "Представител на родителите"],
      ["Петя Лакова", "Представител на родителите"],
      ["Деница Николова", "Представител на родителите"],
      ["Моника Петрова", "Представител на родителите"],
      ["Милена Кръстева", "Представител на финансиращия орган"],
    ] as const
  ).map(([title, content]): Seed => ({ category: "council_reserve", title, content, subtitle: null, icon: null, file_url: null })),
  {
    category: "council_document",
    title: "Устав на Обществения съвет",
    content: "Устав на Обществения съвет при ДГ № 202",
    file_url: "/documents/ustav-obshtestven-savet.pdf",
    subtitle: null,
    icon: null,
  },
  {
    category: "council_document",
    title: "Заповед за състав",
    content: "Заповед за утвърждаване членовете на Обществения съвет за уч. 2025/2026г.",
    file_url: "/documents/zapoved-obshtestven-savet.pdf",
    subtitle: null,
    icon: null,
  },
  ...(Object.entries(PARENT_SETTINGS) as [ParentSettingKey, (typeof PARENT_SETTINGS)[ParentSettingKey]][]).map(
    ([key, setting]): Seed => ({
      category: "setting",
      slug: key,
      title: setting.label,
      content: setting.default,
      subtitle: null,
      icon: null,
      file_url: null,
    }),
  ),
]

/** Defaults shaped like database rows (for fallback rendering). */
export function defaultItems(category: ParentCategory): ParentItem[] {
  return PARENT_DEFAULTS.filter((d) => d.category === category).map((d, i) => ({
    ...d,
    id: `default-${category}-${i}`,
    slug: d.slug ?? `${category}-${i + 1}`,
    order_index: i,
  }))
}

export const PARENT_UPLOAD_PREFIX = "uploads/parents/"
