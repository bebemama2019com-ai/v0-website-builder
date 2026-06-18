'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'

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
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-20 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Group Not Found</h1>
            <p className="text-muted-foreground">{error || 'The group you are looking for does not exist.'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Group Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">{group.name}</h1>
          {group.age && (
            <p className="text-lg text-muted-foreground mb-4">
              Age: <span className="font-semibold">{group.age}</span>
            </p>
          )}
          {group.description && (
            <p className="text-base text-foreground leading-relaxed">{group.description}</p>
          )}
        </div>

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-1">{teacher.name}</h3>
                  {teacher.role && (
                    <p className="text-sm text-muted-foreground mb-3">{teacher.role}</p>
                  )}
                  {teacher.bio && (
                    <p className="text-sm text-foreground leading-relaxed">{teacher.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {teachers.length === 0 && (
          <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No teachers assigned to this group yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
