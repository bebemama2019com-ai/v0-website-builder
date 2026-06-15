"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
}

export default function EditGroupPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [age, setAge] = useState("")
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [orderIndex, setOrderIndex] = useState("0")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    fetchTeamMembers()
    fetchGroup()
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

  async function fetchGroup() {
    try {
      const { data, error } = await supabase.from("groups").select("*").eq("id", params.id).single()

      if (error) {
        console.error("[v0] Error fetching group:", error)
        return
      }

      if (data) {
        setName(data.name)
        setDescription(data.description || "")
        setAge(data.age || "")
        setOrderIndex(data.order_index.toString())
      }

      // Fetch teachers for this group
      const { data: teachersData, error: teachersError } = await supabase
        .from("group_teachers")
        .select("teacher_id")
        .eq("group_id", params.id)
        .order("order_index")

      // If the error is about missing table (Migration 009 not run yet), just skip it
      if (teachersError && teachersError.message && !teachersError.message.includes("does not exist")) {
        console.error("[v0] Error fetching group teachers:", teachersError)
      } else if (teachersData) {
        setSelectedTeachers(teachersData.map((t) => t.teacher_id))
      }
    } catch (error) {
      console.error("[v0] Exception fetching group:", error)
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
      // Update group
      const { error: updateError } = await supabase
        .from("groups")
        .update({
          name,
          description: description || null,
          age: age || null,
          order_index: Number.parseInt(orderIndex),
        })
        .eq("id", params.id)

      if (updateError) {
        console.error("[v0] Error updating group:", updateError)
        throw new Error(`Грешка при актуализация на групата: ${updateError.message}`)
      }

      // Only try to manage teachers if the group_teachers table exists
      // Delete existing teachers
      const { error: deleteError } = await supabase.from("group_teachers").delete().eq("group_id", params.id)
      
      // If table doesn't exist, skip teacher management (Migration 009 not run yet)
      if (deleteError && deleteError.message && !deleteError.message.includes("does not exist")) {
        console.error("[v0] Error deleting teachers:", deleteError)
        throw new Error(`Грешка при изтриване на учители: ${deleteError.message}`)
      }

      // Insert new teachers only if table exists
      if (selectedTeachers.length > 0 && !deleteError?.message?.includes("does not exist")) {
        const groupTeachers = selectedTeachers.map((teacherId, index) => ({
          group_id: params.id,
          teacher_id: teacherId,
          order_index: index,
        }))

        const { error: teacherError } = await supabase.from("group_teachers").insert(groupTeachers)
        if (teacherError) {
          console.error("[v0] Error inserting teachers:", teacherError)
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
          <CardTitle>Редактирай група</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Име на групата *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                {loading ? "Запазване..." : "Запази промените"}
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
