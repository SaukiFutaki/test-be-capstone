"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Lock, Zap, BarChart3, FileText } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Predictions",
    description:
      "Model machine learning canggih yang memberikan prediksi akurat untuk kelayakan kredit pelanggan Anda.",
  },
  {
    icon: Lock,
    title: "Keamanan Data Terjamin",
    description: "Enkripsi end-to-end dan autentikasi JWT untuk melindungi data sensitif pelanggan Anda.",
  },
  {
    icon: Zap,
    title: "Proses Instan",
    description: "Upload file dan dapatkan hasil prediksi dalam hitungan detik dengan teknologi processing yang cepat.",
  },
  {
    icon: BarChart3,
    title: "Visualisasi Data",
    description: "Dashboard interaktif dengan grafik dan tabel yang mudah dipahami untuk analisis mendalam.",
  },
  {
    icon: FileText,
    title: "Format File Fleksibel",
    description: "Mendukung berbagai format file seperti CSV, XLSX, dan XLS untuk kemudahan integrasi.",
  },
  {
    icon: CheckCircle2,
    title: "Riwayat Lengkap",
    description: "Simpan dan akses riwayat semua prediksi yang pernah dilakukan untuk tracking dan audit.",
  },
]

export function Features() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <Card key={index} className="border-border bg-card">
            <CardHeader>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
