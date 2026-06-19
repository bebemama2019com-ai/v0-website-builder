import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

const DAYS = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"]
const MEAL_TYPES = {
  breakfast: "Закуска",
  lunch: "Обяд",
  snack: "Закуска/Кроше",
  dinner: "Вечеря",
}

export default async function ViewMenuPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: menu } = await supabase.from("weekly_menus").select("*").eq("id", params.id).single()

  if (!menu) {
    redirect("/admin/menus")
  }

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_id", params.id)
    .order("day_of_week")
    .order("meal_type")

  const { data: allergenCodes } = await supabase.from("allergen_codes").select("*").order("code")

  const getAgeGroupLabel = (ageGroup: string) => {
    return ageGroup === "yasla" ? "Ясла (1-3 години)" : "Детска градина (3-7 години)"
  }

  const groupedItems: { [key: number]: { [key: string]: string[] } } = {}
  menuItems?.forEach((item) => {
    if (!groupedItems[item.day_of_week]) {
      groupedItems[item.day_of_week] = {}
    }
    if (!groupedItems[item.day_of_week][item.meal_type]) {
      groupedItems[item.day_of_week][item.meal_type] = []
    }
    groupedItems[item.day_of_week][item.meal_type].push(item.dish_name)
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/menus" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад към менютата
              </Link>
              <h1 className="text-3xl font-bold mt-2">{menu.title}</h1>
              <p className="text-muted-foreground mt-1">
                {format(new Date(menu.week_start_date), "d MMMM")} - {format(new Date(menu.week_end_date), "d MMMM yyyy")}
              </p>
            </div>
            <Link href={`/admin/menus/${menu.id}/edit`}>
              <Button>
                <Pencil className="w-4 h-4 mr-2" />
                Редактирай
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {getAgeGroupLabel(menu.age_group)}
          </span>
        </div>

        <div className="space-y-6">
          {DAYS.map((day, dayIndex) => (
            <Card key={dayIndex} className="p-6">
              <h2 className="text-xl font-bold mb-4">{day}</h2>
              <div className="space-y-4">
                {Object.entries(MEAL_TYPES).map(([mealTypeKey, mealTypeLabel]) => {
                  const items = groupedItems[dayIndex + 1]?.[mealTypeKey] || []
                  if (items.length === 0) return null
                  return (
                    <div key={mealTypeKey}>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">{mealTypeLabel}</h3>
                      <ul className="space-y-1">
                        {items.map((item, idx) => (
                          <li key={idx} className="text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        {allergenCodes && allergenCodes.length > 0 && (
          <Card className="p-6 mt-8 bg-accent/5">
            <h3 className="font-bold mb-4">Обозначения на алергени</h3>
            <div className="grid gap-3">
              {allergenCodes.map((allergen) => (
                <div key={allergen.code} className="flex gap-2">
                  <span className="font-bold text-primary min-w-8">{allergen.code}.</span>
                  <span className="text-sm">{allergen.name_bg} - {allergen.description}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
