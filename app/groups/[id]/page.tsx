'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Clock, BookOpen } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/lib/i18n/language-context'

interface Group {
  id: string
  name: string
  description: string | null
  age: string | null
  order_index: number
}

interface Teacher {
  id: string
  name: string
  role: string | null
  bio: string | null
}

interface GroupTeacher {
  teacher_id: string
  team_members: Teacher
}

interface GroupSchedule {
  id: string
  day_of_week: number
  time_period: string
  activity: string
  order_index: number
}

const DAY_NAMES_BG = ['', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък']
const DAY_NAMES_EN = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function GroupPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [group, setGroup] = useState<Group | null>(null)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [schedules, setSchedules] = useState<GroupSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const groupId = typeof params.id === 'string' ? params.id : params.id?.[0]

  useEffect(() => {
    if (!groupId) {
      setError('No group ID provided')
      setLoading(false)
      return
    }

    fetchGroupData()
  }, [groupId])

  async function fetchGroupData() {
    try {
      setLoading(true)
      setError(null)
      const supabase = await createClient()

      // Fetch group details
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single()

      if (groupError) {
        console.error('[v0] Error fetching group:', groupError)
        throw new Error(groupError.message)
      }

      if (!groupData) {
        throw new Error('Group not found')
      }

      setGroup(groupData)

      // Fetch teachers for this group
      const { data: teachersData, error: teachersError } = await supabase
        .from('group_teachers')
        .select(`
          teacher_id,
          team_members:teacher_id (
            id,
            name,
            role,
            bio
          )
        `)
        .eq('group_id', groupId)
        .order('order_index')

      // If teachers table doesn't exist yet, just show group without teachers
      if (teachersError && !teachersError.message.includes('does not exist')) {
        console.error('[v0] Error fetching teachers:', teachersError)
      }

      if (teachersData) {
        const teachersList = teachersData.map((t: GroupTeacher) => t.team_members).filter(Boolean)
        setTeachers(teachersList)
      }

      // Fetch schedules for this group
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('group_schedules')
        .select('*')
        .eq('group_id', groupId)
        .order('day_of_week')
        .order('order_index')

      // If schedules table doesn't exist yet, just continue without it
      if (schedulesError && !schedulesError.message.includes('does not exist')) {
        console.error('[v0] Error fetching schedules:', schedulesError)
      }

      if (schedulesData) {
        setSchedules(schedulesData)
      }
    } catch (err) {
      console.error('[v0] Error loading group:', err)
      setError(err instanceof Error ? err.message : 'Failed to load group')
    } finally {
      setLoading(false)
    }
  }

  // Group schedules by day
  const schedulesByDay = schedules.reduce((acc, schedule) => {
    const day = schedule.day_of_week
    if (!acc[day]) acc[day] = []
    acc[day].push(schedule)
    return acc
  }, {} as Record<number, GroupSchedule[]>)

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">{language === 'bg' ? 'Зареждане на групата...' : 'Loading group...'}</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !group) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle>{language === 'bg' ? 'Групата не е намерена' : 'Group Not Found'}</CardTitle>
                <CardDescription>{error || (language === 'bg' ? 'Групата, която търсите, не съществува.' : 'The group you are looking for does not exist.')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-primary">
          <div className="max-w-4xl mx-auto text-center">
            {group.age && (
              <div className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full mb-6">
                <p className="text-sm font-semibold">
                  {language === 'bg' ? 'Възраст' : 'Age'}: {group.age}
                </p>
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              {language === 'bg' ? 'Група' : 'Group'} <span className="text-primary">{group.name}</span>
            </h1>
            {group.description && (
              <p className="text-lg text-muted-foreground">{group.description}</p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Teachers Section */}
          {teachers.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">
                  {language === 'bg' ? 'Педагози' : 'Teachers'}
                </h2>
              </div>

              <div className="space-y-4">
                {teachers.map((teacher) => (
                  <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-2xl text-primary">{teacher.name}</CardTitle>
                      {teacher.role && (
                        <CardDescription className="text-base">{teacher.role}</CardDescription>
                      )}
                    </CardHeader>
                    {teacher.bio && (
                      <CardContent>
                        <p className="text-foreground leading-relaxed">{teacher.bio}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Schedule Section */}
          {schedules.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Clock className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">
                  {language === 'bg' ? 'Седмична програма' : 'Weekly Program'}
                </h2>
              </div>

              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((dayNum) => (
                  schedulesByDay[dayNum] && schedulesByDay[dayNum].length > 0 && (
                    <Card key={dayNum} className="overflow-hidden">
                      <CardHeader className="bg-primary/5">
                        <CardTitle className="text-xl text-primary">
                          {language === 'bg' ? DAY_NAMES_BG[dayNum] : DAY_NAMES_EN[dayNum]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {schedulesByDay[dayNum].map((schedule) => (
                            <div key={schedule.id} className="flex gap-4 items-start">
                              <Clock className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-foreground font-semibold">{schedule.activity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
