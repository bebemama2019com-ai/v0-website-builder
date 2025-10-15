"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Group {
  id: string
  name: string
}

interface ScheduleItem {
  id: string
  day_of_week: number
  time_period: string
  activity: string
  order_index: number
}

const DAYS = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"]
const TIME_PERIODS = { morning: "Сутрин", afternoon: "Следобед" }

export default function GroupSchedulePage() {
  const [group, setGroup] = useState<Group | null>(null)
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [newActivity, setNewActivity] = useState("")
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedPeriod, setSelectedPeriod] = useState<"morning" | "afternoon">("morning")
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    fetchGroup()
    fetchSchedules()
  }, [])

  async function fetchGroup() {
    const { data } = await supabase.from("groups").select("id, name").eq("id", params.id).single()
    setGroup(data)
  }

  async function fetchSchedules() {
    const { data } = await supabase
      .from("group_schedules")
      .select("*")
      .eq("group_id", params.id)
      .order("day_of_week")
      .order("time_period")
      .order("order_index")
    setSchedules(data || [])
  }

  async function addActivity() {
    if (!newActivity.trim()) return

    try {
      const { error } = await supabase.from("group_schedules").insert({
        group_id: params.id,
        day_of_week: selectedDay,
        time_period: selectedPeriod,
        activity: newActivity,
        order_index: schedules.filter((s) => s.day_of_week === selectedDay && s.time_period === selectedPeriod).length,
      })

      if (error) throw error
      setNewActivity("")
      fetchSchedules()
    } catch (error) {
      console.error("Грешка при добавяне:", error)
      alert("Грешка при добавяне на дейност")
    }
  }

  async function deleteActivity(id: string) {
    try {
      const { error } = await supabase.from("group_schedules").delete().eq("id", id)
      if (error) throw error
      fetchSchedules()
    } catch (error) {
      console.error("Грешка при изтриване:", error)
    }
  }

  const getScheduleForDay = (day: number, period: string) => {
    return schedules.filter((s) => s.day_of_week === day && s.time_period === period)
  }

  return (
    <div className="container mx-auto p-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/admin/groups">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад към групи
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{group?.name} - Седмична програма</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Добави дейност</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number.parseInt(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {DAYS.map((day, index) => (
                <option key={index} value={index + 1}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as "morning" | "afternoon")}
              className="border rounded px-3 py-2"
            >
              <option value="morning">Сутрин</option>
              <option value="afternoon">Следобед</option>
            </select>
            <Input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Име на дейност"
              className="flex-1"
            />
            <Button onClick={addActivity}>
              <Plus className="mr-2 h-4 w-4" />
              Добави
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {DAYS.map((day, dayIndex) => (
          <Card key={dayIndex}>
            <CardHeader>
              <CardTitle>{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {(["morning", "afternoon"] as const).map((period) => (
                  <div key={period}>
                    <h3 className="font-semibold mb-3">{TIME_PERIODS[period]}</h3>
                    <div className="space-y-2">
                      {getScheduleForDay(dayIndex + 1, period).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span>{item.activity}</span>
                          <Button variant="ghost" size="sm" onClick={() => deleteActivity(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {getScheduleForDay(dayIndex + 1, period).length === 0 && (
                        <p className="text-sm text-muted-foreground">Няма дейности</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
