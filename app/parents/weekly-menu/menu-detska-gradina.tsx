"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export default function MenuDetskagadinaPage() {
  const { language } = useLanguage()

  const weeklyData = [
    {
      day: language === "bg" ? "Понеделник" : "Monday",
      breakfast: { meal: "Попара с масло и сирене", allergens: "АВ" },
      tenOclock: { meal: "плод", allergens: "" },
      lunch: [
        { meal: "Супа-пиле със застройка", allergens: "ВЕ" },
        { meal: "Яхния от леща", allergens: "АЕ" },
        { meal: "Плод /натурален сок/", allergens: "" },
      ],
      afternoon: [
        { meal: "Сандвич с масло и сирене", allergens: "АВ" },
      ],
    },
    {
      day: language === "bg" ? "Вторник" : "Tuesday",
      breakfast: { meal: "Сандвич с яйчен пастет", allergens: "АВС" },
      tenOclock: { meal: "ябълка", allergens: "" },
      lunch: [
        { meal: "Хляб Пълнозърнест", allergens: "А" },
        { meal: "Супа от спанак", allergens: "ВЕ" },
        { meal: "Пиле с ориз", allergens: "А" },
        { meal: "ябълка", allergens: "" },
      ],
      afternoon: [
        { meal: "Айран", allergens: "В" },
        { meal: "ХлябДобруджа", allergens: "А" },
        { meal: "Малеби мус с банан", allergens: "В" },
      ],
    },
    {
      day: language === "bg" ? "Сряда" : "Wednesday",
      breakfast: { meal: "Хляб Добруджа", allergens: "А" },
      tenOclock: { meal: "Макаронено изделие с масло и сирене", allergens: "АВ" },
      lunch: [
        { meal: "Хляб Добруджа", allergens: "А" },
        { meal: "Таратор", allergens: "В" },
        { meal: "Кюфтета с бял сос", allergens: "АС" },
        { meal: "Ябълка", allergens: "" },
      ],
      afternoon: [
        { meal: "Мляко с Грис", allergens: "АВ" },
      ],
    },
    {
      day: language === "bg" ? "Четвъртък" : "Thursday",
      breakfast: { meal: "Сандвич с шунка и кашкавал", allergens: "АВ" },
      tenOclock: { meal: "Краставици", allergens: "" },
      lunch: [
        { meal: "Хляб Пълнозърнест", allergens: "А" },
        { meal: "Телешко варено", allergens: "АВСЕ" },
        { meal: "Постен гювеч", allergens: "Е" },
        { meal: "кайсия", allergens: "" },
      ],
      afternoon: [
        { meal: "Банан", allergens: "" },
        { meal: "Бисквитена торта", allergens: "АВ" },
        { meal: "Айрян", allergens: "В" },
      ],
    },
    {
      day: language === "bg" ? "Петък" : "Friday",
      breakfast: { meal: "Сандвич с масло и кленов сироп", allergens: "В" },
      tenOclock: { meal: "Прясно мляко", allergens: "В" },
      lunch: [
        { meal: "Хляб Добруджа", allergens: "А" },
        { meal: "череши", allergens: "" },
        { meal: "Хляб Пълнозърнест", allergens: "А" },
        { meal: "Супа - боб лющен", allergens: "Е" },
        { meal: "Риба на фурна", allergens: "D" },
        { meal: "Картофи с масло", allergens: "В" },
      ],
      afternoon: [
        { meal: "Банан", allergens: "" },
        { meal: "Хляб Добруджа", allergens: "А" },
        { meal: "Крем от кисело мляко, бисквити и пресен плод /банан/", allergens: "АВ" },
        { meal: "Банан", allergens: "" },
      ],
    },
  ]

  const allergens = [
    { code: "A", text: language === "bg" ? "Зърнени храни" : "Cereals" },
    { code: "B", text: language === "bg" ? "Мляко и млечни продукти" : "Milk and dairy" },
    { code: "C", text: language === "bg" ? "Яйца" : "Eggs" },
    { code: "D", text: language === "bg" ? "Риба и рибни продукти" : "Fish and fish products" },
    { code: "E", text: language === "bg" ? "Целина" : "Celery" },
    { code: "F", text: language === "bg" ? "Ядки" : "Nuts" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-background to-secondary/20 px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <Link href="/parents/weekly-menu">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "bg" ? "Назад" : "Back"}
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-2xl bg-primary/10 p-4">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {language === "bg" ? "Детска градина" : "Kindergarten"}
              </h1>
              <p className="text-muted-foreground">
                {language === "bg" ? "Възрастова група от 3 до 7 години" : "Age group 3-7 years"}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {language === "bg"
              ? "От 15.06.26 до 19.06.2026 год."
              : "From 15.06.26 to 19.06.2026"}
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Weekly Menu */}
          <div className="grid gap-6">
            {weeklyData.map((dayMenu, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl border-2">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-3">
                  <CardTitle className="text-2xl font-bold text-foreground">{dayMenu.day}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Breakfast */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">
                        {language === "bg" ? "Сутрешна закуска" : "Breakfast"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-foreground">
                          {dayMenu.breakfast.meal}
                          {dayMenu.breakfast.allergens && (
                            <span className="ml-2 font-bold text-primary">{dayMenu.breakfast.allergens}</span>
                          )}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground pt-3">
                        {language === "bg" ? "10 часа" : "10 AM Snack"}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-foreground inline-block">
                        {dayMenu.tenOclock.meal}
                      </span>
                    </div>

                    {/* Lunch */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">
                        {language === "bg" ? "Обяд" : "Lunch"}
                      </h3>
                      <div className="space-y-2">
                        {dayMenu.lunch.map((item, idx) => (
                          <div key={idx} className="rounded-lg bg-accent/10 px-4 py-2">
                            <p className="text-sm text-foreground">
                              {item.meal}
                              {item.allergens && (
                                <span className="ml-2 font-bold text-primary">{item.allergens}</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Afternoon Snack */}
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold text-foreground">
                      {language === "bg" ? "Следобедна закуска" : "Afternoon Snack"}
                    </h3>
                    <div className="space-y-2">
                      {dayMenu.afternoon.map((item, idx) => (
                        <div key={idx} className="rounded-lg bg-secondary/10 px-4 py-2">
                          <p className="text-sm text-foreground">
                            {item.meal}
                            {item.allergens && (
                              <span className="ml-2 font-bold text-primary">{item.allergens}</span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Allergen Information */}
          <Card className="mt-12 overflow-hidden rounded-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-xl font-bold">
                {language === "bg" ? "Информация за алергени (Регламент 1169/2011г.)" : "Allergen Information (Regulation 1169/2011)"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allergens.map((allergen) => (
                  <div key={allergen.code} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {allergen.code}
                    </span>
                    <span className="text-sm text-foreground">{allergen.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer Information */}
          <div className="mt-8 rounded-2xl border-2 border-muted bg-muted/50 p-6">
            <p className="text-sm text-muted-foreground">
              {language === "bg"
                ? "Менюто е съобразено с Наредба №6 на МЗ и Наредба №9 и № 8 на МЗХ. Менюто може да бъде променено поради независещи от нас причини."
                : "The menu complies with Regulation No. 6 of the Ministry of Health and Regulations No. 9 and No. 8 of the Ministry of Agriculture. The menu may be changed due to reasons beyond our control."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
