"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { Plus, Trash2 } from "lucide-react"

const DAYS = [
  { value: 1, label: "Понеделник" },
  { value: 2, label: "Вторник" },
  { value: 3, label: "Сряда" },
  { value: 4, label: "Четвъртък" },
  { value: 5, label: "Петък" },
]

const MEAL_TYPES = [
  { value: "breakfast", label: "Закуска" },
  { value: "lunch", label: "Обяд" },
  { value: "snack", label: "Закуска/Кроше" },
  { value: "dinner", label: "Вечеря" },
]

const ALLERGENS = [
  { code: "A", label: "Глутен" },
  { code: "B", label: "Мълко" },
  { code: "C", label: "Яйца" },
  { code: "D", label: "Риба" },
  { code: "E", label: "Бобови" },
  { code: "F", label: "Соя" },
]

interface MenuItem {
  id?: string
  menu_id?: string
  day_of_week: number
  meal_type: string
  dish_name: string
  allergens?: string
  order_index?: number
}

interface MenuFormProps {
  menu?: {
    id: string
    title: string
    age_group: string
    week_start_date: string
    week_end_date: string
  }
  menuItems?: MenuItem[]
}

export default function MenuForm({ menu, menuItems = [] }: MenuFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: menu?.title || "",
    age_group: menu?.age_group || "kindergarten",
    week_start_date: menu?.week_start_date || new Date().toISOString().split("T")[0],
    week_end_date: menu?.week_end_date || new Date().toISOString().split("T")[0],
  })
  const [items, setItems] = useState<MenuItem[]>(menuItems)

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        day_of_week: 1,
        meal_type: "breakfast",
        dish_name: "",
        allergens: "",
      },
    ])
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (
    index: number,
    field: keyof MenuItem,
    value: string | number,
  ) => {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setItems(updatedItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (menu) {
        // Update existing menu
        const { error } = await supabase
          .from("weekly_menus")
          .update(formData)
          .eq("id", menu.id)

        if (error) throw error

        // Delete old menu items
        await supabase.from("menu_items").delete().eq("menu_id", menu.id)

        // Insert new menu items
        for (const item of items) {
          const { error: itemError } = await supabase.from("menu_items").insert({
            menu_id: menu.id,
            day_of_week: item.day_of_week,
            meal_type: item.meal_type,
            dish_name: item.dish_name,
            allergens: item.allergens || null,
          })

          if (itemError) throw itemError
        }
      } else {
        // Create new menu
        const { data: newMenu, error: menuError } = await supabase
          .from("weekly_menus")
          .insert([formData])
          .select()

        if (menuError) throw menuError

        const menuId = newMenu[0].id

        // Insert menu items
        for (const item of items) {
          const { error: itemError } = await supabase.from("menu_items").insert({
            menu_id: menuId,
            day_of_week: item.day_of_week,
            meal_type: item.meal_type,
            dish_name: item.dish_name,
            allergens: item.allergens || null,
          })

          if (itemError) throw itemError
        }
      }

      router.push("/admin/menus")
      router.refresh()
    } catch (error) {
      console.error("Error saving menu:", error)
      alert("Error saving menu. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getDayLabel = (dayNum: number) => DAYS.find((d) => d.value === dayNum)?.label || ""
  const getMealLabel = (mealType: string) =>
    MEAL_TYPES.find((m) => m.value === mealType)?.label || ""

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Наименование на меню *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Седмично меню"
              required
            />
          </div>

          <div>
            <Label htmlFor="age_group">Възрастова група *</Label>
            <select
              id="age_group"
              value={formData.age_group}
              onChange={(e) =>
                setFormData({ ...formData, age_group: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="yasla">Ясла (1-3 години)</option>
              <option value="kindergarten">Детска градина (3-7 години)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="week_start_date">Начало на седмицата *</Label>
            <Input
              id="week_start_date"
              type="date"
              value={formData.week_start_date}
              onChange={(e) =>
                setFormData({ ...formData, week_start_date: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="week_end_date">Край на седмицата *</Label>
            <Input
              id="week_end_date"
              type="date"
              value={formData.week_end_date}
              onChange={(e) =>
                setFormData({ ...formData, week_end_date: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ястия за седмицата</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добави ястие
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <Card key={index} className="p-4 bg-accent/5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`day-${index}`} className="text-sm">
                      Ден на седмицата *
                    </Label>
                    <select
                      id={`day-${index}`}
                      value={item.day_of_week}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "day_of_week",
                          parseInt(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      {DAYS.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor={`meal-${index}`} className="text-sm">
                      Тип прием *
                    </Label>
                    <select
                      id={`meal-${index}`}
                      value={item.meal_type}
                      onChange={(e) =>
                        handleItemChange(index, "meal_type", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      {MEAL_TYPES.map((meal) => (
                        <option key={meal.value} value={meal.value}>
                          {meal.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor={`dish-${index}`} className="text-sm">
                      Ястие *
                    </Label>
                    <Input
                      id={`dish-${index}`}
                      value={item.dish_name}
                      onChange={(e) =>
                        handleItemChange(index, "dish_name", e.target.value)
                      }
                      placeholder="Напр. Гарнирова супа"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`allergens-${index}`} className="text-sm">
                      Алергени
                    </Label>
                    <Input
                      id={`allergens-${index}`}
                      value={item.allergens || ""}
                      onChange={(e) =>
                        handleItemChange(index, "allergens", e.target.value)
                      }
                      placeholder="Напр. A, B, C"
                    />
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Изтрий
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Няма добавени ястия. Натиснете "Добави ястие" за да добавите едно.
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Запазване..." : menu ? "Обнови меню" : "Създай меню"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/menus")}
          >
            Отказ
          </Button>
        </div>
      </form>
    </Card>
  )
}
