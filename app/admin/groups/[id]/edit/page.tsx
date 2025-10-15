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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
}

export default function EditGroupPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [responsibleTeacherId, setResponsibleTeacherId] = useState("")
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
    const { data } = await supabase.from("team_members").select("id, name").order("name")
    setTeamMembers(data || [])
  }

  async function fetchGroup() {
    const { data } = await supabase.from("groups").select("*").eq("id", params.id).single()

    if (data) {
      setName(data.name)
      setDescription(data.description || "")
      setResponsibleTeacherId(data.responsible_teacher_id || "none")
      setOrderIndex(data.order_index.toString())
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("groups")
        .update({
          name,
          description: description || null,
          responsible_teacher_id: responsibleTeacherId === "none" ? null : responsibleTeacherId,
          order_index: Number.parseInt(orderIndex),
        })
        .eq("id", params.id)

      if (error) throw error
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
              <Label htmlFor="teacher">Отговорен учител</Label>
              <Select value={responsibleTeacherId} onValueChange={setResponsibleTeacherId}>
                <SelectTrigger>
                  <SelectValue placeholder="Изберете учител" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Без отговорник</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
