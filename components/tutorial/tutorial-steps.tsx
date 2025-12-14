"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, LogIn, Upload, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "1. Registrasi Akun",
    description: "Buat akun baru dengan mengisi nama lengkap, email, dan password Anda.",
    badge: "Langkah Pertama",
  },
  {
    icon: LogIn,
    title: "2. Login ke Dashboard",
    description: "Masuk menggunakan email dan password yang telah didaftarkan untuk mengakses dashboard.",
    badge: "Autentikasi",
  },
  {
    icon: Upload,
    title: "3. Upload File Data",
    description: "Upload file CSV atau Excel (.csv, .xlsx, .xls) yang berisi data pelanggan untuk dianalisis.",
    badge: "Input Data",
  },
  {
    icon: BarChart3,
    title: "4. Lihat Hasil Prediksi",
    description:
      "Sistem AI akan memproses data dan menampilkan hasil prediksi kelayakan kredit beserta skor confidence.",
    badge: "Output",
  },
]

export function TutorialSteps() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon
        return (
          <Card
            key={index}
            className="relative overflow-hidden border-border bg-card hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="size-6 text-primary" />
                </div>
                <Badge  className="text-xs">
                  {step.badge}
                </Badge>
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
