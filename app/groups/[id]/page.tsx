'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
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

export default function GroupPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [group, setGroup] = useState<Group | null>(null)
  const [teachers, setTeachers] = useState<Teacher[]>([])
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
    } catch (err) {
      console.error('[v0] Error loading group:', err)
      setError(err instanceof Error ? err.message : 'Failed to load group')
    } finally {
      setLoading(false)
    }
  }

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
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        {/* Group Header Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-4xl">{group.name}</CardTitle>
            {group.age && (
              <CardDescription className="text-base">
                Age Range: <span className="font-semibold text-foreground">{group.age}</span>
              </CardDescription>
            )}
          </CardHeader>
          {group.description && (
            <CardContent>
              <p className="text-foreground leading-relaxed">{group.description}</p>
            </CardContent>
          )}
        </Card>

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">{language === 'bg' ? 'Педагози' : 'Teachers'}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl">{teacher.name}</CardTitle>
                    {teacher.role && (
                      <CardDescription className="text-base">{teacher.role}</CardDescription>
                    )}
                  </CardHeader>
                  {teacher.bio && (
                    <CardContent className="pt-4">
                      <p className="text-foreground leading-relaxed">{teacher.bio}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {teachers.length === 0 && (
          <Card className="bg-muted/50">
            <CardContent className="pt-8 text-center">
              <p className="text-muted-foreground">{language === 'bg' ? 'Няма назначени педагози за тази група.' : 'No teachers assigned to this group yet.'}</p>
            </CardContent>
          </Card>
        )}
        </div>
      </main>
      <Footer />
    </>
  )
}
