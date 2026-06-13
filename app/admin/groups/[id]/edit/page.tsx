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
    const { data } = await supabase.from("team_members").select("id, name, role, bio").order("name")
    setTeamMembers(data || [])
  }

  async function fetchGroup() {
    const { data } = await supabase.from("groups").select("*").eq("id", params.id).single()

    if (data) {
      setName(data.name)
      setDescription(data.description || "")
      setAge(data.age || "")
      setOrderIndex(data.order_index.toString())
    }

    // Fetch teachers for this group
    const { data: teachersData } = await supabase
      .from("group_teachers")
      .select("teacher_id")
      .eq("group_id", params.id)
      .order("order_index")

    if (teachersData) {
      setSelectedTeachers(teachersData.map((t) => t.teacher_id))
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

      if (updateError) throw updateError

      // Delete existing teachers
      await supabase.from("group_teachers").delete().eq("group_id", params.id)

      // Insert new teachers
      if (selectedTeachers.length > 0) {
        const groupTeachers = selectedTeachers.map((teacherId, index) => ({
          group_id: params.id,
          teacher_id: teacherId,
          order_index: index,
        }))

        const { error: teacherError } = await supabase.from("group_teachers").insert(groupTeachers)
        if (teacherError) throw teacherError
      }

      router.push("/admin/groups")
    } catch (error) {
      console.error("Грешка при актуализация:", error)
      alert("Грешка при актуализация на групата")
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
