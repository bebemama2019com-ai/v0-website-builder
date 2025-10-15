"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/i18n/language-context"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

type Teacher = {
  id: string
  name: string
  role: string
  bio?: string
  image_url?: string
}

type Schedule = {
  id: string
  day_of_week: number
  time_period: string
  activity: string
  order_index: number
}

type GroupData = {
  id: string
  name: string
  name_en: string
  description?: string
  description_en?: string
  age_range?: string
  age_range_en?: string
  team_members: Teacher
  schedules: Schedule[]
}

export default function Group1Page() {
  const { language } = useLanguage()
  const [groupData, setGroupData] = useState<GroupData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGroupData() {
      try {
        const response = await fetch("/api/groups/by-slug/group-1")
        if (!response.ok) throw new Error("Failed to fetch group data")
        const data = await response.json()
        setGroupData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchGroupData()
  }, [])

  const getScheduleByDay = (dayOfWeek: number) => {
    if (!groupData?.schedules) return { morning: [], afternoon: [] }

    const daySchedules = groupData.schedules.filter((s) => s.day_of_week === dayOfWeek)
    return {
      morning: daySchedules.filter((s) => s.time_period === "morning").map((s) => s.activity),
      afternoon: daySchedules.filter((s) => s.time_period === "afternoon").map((s) => s.activity),
    }
  }

  const days = [
    { num: 1, bg: "Понеделник", en: "Monday" },
    { num: 2, bg: "Вторник", en: "Tuesday" },
    { num: 3, bg: "Сряда", en: "Wednesday" },
    { num: 4, bg: "Четвъртък", en: "Thursday" },
    { num: 5, bg: "Петък", en: "Friday" },
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !groupData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Alert variant="destructive">
            <AlertDescription>
              {language === "bg"
                ? "Таблиците за групи не са създадени. Моля, изпълнете SQL скрипта 004_add_group_schedules.sql от папката scripts, за да създадете необходимите таблици."
                : "Groups tables not created. Please run the SQL script 004_add_group_schedules.sql from the scripts folder to create the required tables."}
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {language === "bg" ? groupData.name : groupData.name_en}
            </h1>
            {groupData.age_range && (
              <p className="mt-4 text-lg text-muted-foreground">
                {language === "bg"
                  ? `Възраст: ${groupData.age_range}`
                  : `Age: ${groupData.age_range_en || groupData.age_range}`}
              </p>
            )}
            {groupData.description && (
              <p className="mt-2 text-muted-foreground">
                {language === "bg" ? groupData.description : groupData.description_en}
              </p>
            )}
          </div>

          {/* Responsible Teacher */}
          {groupData.team_members && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{language === "bg" ? "Отговорен учител" : "Responsible Teacher"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={groupData.team_members.image_url || "/placeholder.svg"}
                      alt={groupData.team_members.name}
                    />
                    <AvatarFallback>{groupData.team_members.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{groupData.team_members.name}</h3>
                    <p className="text-muted-foreground">{groupData.team_members.role}</p>
                    {groupData.team_members.bio && (
                      <p className="mt-2 text-sm text-muted-foreground">{groupData.team_members.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "bg" ? "Седмична програма" : "Weekly Schedule"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left font-semibold">{language === "bg" ? "Ден" : "Day"}</th>
                      <th className="p-4 text-left font-semibold">{language === "bg" ? "Сутрин" : "Morning"}</th>
                      <th className="p-4 text-left font-semibold">{language === "bg" ? "Следобед" : "Afternoon"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day) => {
                      const schedule = getScheduleByDay(day.num)
                      return (
                        <tr key={day.num} className="border-b">
                          <td className="p-4 font-medium">{language === "bg" ? day.bg : day.en}</td>
                          <td className="p-4">
                            {schedule.morning.length > 0 ? (
                              <ul className="space-y-1">
                                {schedule.morning.map((activity, i) => (
                                  <li key={i}>{activity}</li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            {schedule.afternoon.length > 0 ? (
                              <ul className="space-y-1">
                                {schedule.afternoon.map((activity, i) => (
                                  <li key={i}>{activity}</li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
