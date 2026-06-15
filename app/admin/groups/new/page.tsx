"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
}

export default function NewGroupPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [age, setAge] = useState("")
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [orderIndex, setOrderIndex] = useState("0")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  async function fetchTeamMembers() {
    try {
      const { data, error } = await supabase.from("team_members").select("id, name, role, bio").order("name")
      if (error) {
        console.error("[v0] Error fetching team members:", error)
        return
      }
      setTeamMembers(data || [])
    } catch (error) {
      console.error("[v0] Exception fetching team members:", error)
    }
  }

  const toggleTeacher = (teacherId: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // Insert group
      const { data: groupData, error: groupError } = await supabase
        .from("groups")
        .insert({
          name,
          description: description || null,
          age: age || null,
          order_index: Number.parseInt(orderIndex),
        })
        .select()

      if (groupError) {
        console.error("[v0] Error creating group:", groupError)
        throw new Error(`Грешка при създаване на групата: ${groupError.message}`)
      }

      const groupId = groupData?.[0]?.id
      if (!groupId) {
        throw new Error("Не беше възможно да се създаде групата")
      }

      // Insert group_teachers relationships only if table exists (Migration 009 run)
      if (selectedTeachers.length > 0) {
        const groupTeachers = selectedTeachers.map((teacherId, index) => ({
          group_id: groupId,
          teacher_id: teacherId,
          order_index: index,
        }))

        const { error: teacherError } = await supabase.from("group_teachers").insert(groupTeachers)
        
        // If table doesn't exist, log warning but don't fail - group was created successfully
        if (teacherError && teacherError.message && teacherError.message.includes("does not exist")) {
          console.warn("[v0] group_teachers table not found - Migration 009 not run yet. Group created but teachers not assigned.")
        } else if (teacherError) {
          console.error("[v0] Error adding teachers to group:", teacherError)
          throw new Error(`Грешка при добавяне на учители: ${teacherError.message}`)
        }
      }

      router.push("/admin/groups")
    } catch (error) {
      console.error("[v0] Error saving group:", error)
      const errorMessage = error instanceof Error ? error.message : "Грешка при съхраняване на групата"
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/admin/groups">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Добави нова група</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Име на групата *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Група 1" required />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Кратко описание на групата"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="age">Възраст</Label>
              <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="например: 2-3 години" />
            </div>

            <div>
              <Label>Отговорни учители</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-4">
                {teamMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Няма налични учители</p>
                ) : (
                  teamMembers.map((member) => (
                    <div key={member.id} className="flex items-start gap-3">
                      <Checkbox
                        id={member.id}
                        checked={selectedTeachers.includes(member.id)}
                        onCheckedChange={() => toggleTeacher(member.id)}
                      />
                      <label htmlFor={member.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                        {member.bio && <div className="text-xs text-muted-foreground line-clamp-2">{member.bio}</div>}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Избрани: {selectedTeachers.length} {selectedTeachers.length === 1 ? "учител" : "учители"}
              </p>
            </div>

            <div>
              <Label htmlFor="order">Ред на показване</Label>
              <Input
                id="order"
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(e.target.value)}
                min="0"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Запазване..." : "Запази"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/groups">Отказ</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
