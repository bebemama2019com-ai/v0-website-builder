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

// Generate time periods from 09:00 to 16:00 in 30-minute intervals
const TIME_PERIODS = [
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 13:00",
  "13:00 - 13:30",
  "13:30 - 14:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "15:00 - 15:30",
  "15:30 - 16:00",
]

export default function GroupSchedulePage() {
  const [group, setGroup] = useState<Group | null>(null)
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [newActivity, setNewActivity] = useState("")
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS[0])
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    if (params.id) {
      fetchGroup()
      fetchSchedules()
    }
  }, [params.id])

  async function fetchGroup() {
    try {
      const groupId = Array.isArray(params.id) ? params.id[0] : params.id
      const { data, error } = await supabase.from("groups").select("id, name").eq("id", groupId).single()
      
      if (error) {
        console.error("[v0] Error fetching group:", error)
      }
      setGroup(data)
    } catch (error) {
      console.error("[v0] Exception fetching group:", error)
    }
  }

  async function fetchSchedules() {
    try {
      const groupId = Array.isArray(params.id) ? params.id[0] : params.id
      const { data, error } = await supabase
        .from("group_schedules")
        .select("*")
        .eq("group_id", groupId)
        .order("day_of_week")
        .order("time_period")
        .order("order_index")
      
      if (error && !error.message.includes("does not exist")) {
        console.error("[v0] Error fetching schedules:", error)
      }
      
      setSchedules(data || [])
    } catch (error) {
      console.error("[v0] Exception fetching schedules:", error)
    }
  }

  async function addActivity() {
    if (!newActivity.trim()) return

    try {
      const groupId = Array.isArray(params.id) ? params.id[0] : params.id
      
      const { error } = await supabase.from("group_schedules").insert({
        group_id: groupId,
        day_of_week: selectedDay,
        time_period: selectedPeriod,
        activity: newActivity,
        order_index: schedules.filter((s) => s.day_of_week === selectedDay && s.time_period === selectedPeriod).length,
      })

      if (error) {
        console.error("[v0] Error adding activity:", error)
        throw new Error(`${error.message || "Failed to add activity"}`)
      }
      
      setNewActivity("")
      await fetchSchedules()
    } catch (error) {
      console.error("[v0] Грешка при добавяне:", error)
      alert(`Грешка при добавяне на дейност: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async function deleteActivity(id: string) {
    try {
      const { error } = await supabase.from("group_schedules").delete().eq("id", id)
      if (error) {
        console.error("[v0] Error deleting activity:", error)
        throw error
      }
      await fetchSchedules()
    } catch (error) {
      console.error("[v0] Грешка при изтриване:", error)
      alert("Грешка при изтриване на дейност")
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
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {TIME_PERIODS.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
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
              <div className="space-y-4">
                {TIME_PERIODS.map((period) => (
                  <div key={period} className="border rounded p-4">
                    <h3 className="font-semibold mb-3 text-primary">{period}</h3>
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
