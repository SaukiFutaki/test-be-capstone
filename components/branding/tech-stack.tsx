"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Palette, Database, Shield, Zap, Brain } from "lucide-react"

const technologies = [
  {
    category: "Frontend Framework",
    icon: Code2,
    items: [
      { name: "Next.js 16", description: "React framework dengan App Router" },
      { name: "React 19", description: "Server & Client Components" },
      { name: "TypeScript", description: "Type-safe development" },
    ],
  },
  {
    category: "UI & Styling",
    icon: Palette,
    items: [
      { name: "Tailwind CSS 4", description: "Utility-first CSS framework" },
      { name: "shadcn/ui", description: "Radix UI component library" },
      { name: "Lucide Icons", description: "Beautiful icon library" },
    ],
  },
  {
    category: "Form & Validation",
    icon: Shield,
    items: [
      { name: "React Hook Form", description: "Performant form management" },
      { name: "Zod", description: "TypeScript-first schema validation" },
      { name: "Sonner", description: "Modern toast notifications" },
    ],
  },
  {
    category: "Backend & API",
    icon: Database,
    items: [
      { name: "REST API", description: "RESTful architecture" },
      { name: "JWT Auth", description: "Secure authentication" },
      { name: "File Upload", description: "CSV/Excel processing" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: [
      { name: "Credit Scoring AI", description: "ML model untuk prediksi" },
      { name: "Data Processing", description: "Automated data analysis" },
      { name: "Confidence Score", description: "Probabilistic predictions" },
    ],
  },
  {
    category: "Performance",
    icon: Zap,
    items: [
      { name: "Server Actions", description: "Progressive enhancement" },
      { name: "useTransition", description: "Optimistic UI updates" },
      { name: "Vercel Analytics", description: "Performance monitoring" },
    ],
  },
]

export function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {technologies.map((tech, index) => {
        const Icon = tech.icon
        return (
          <Card key={index} className="border-border bg-card hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-base">{tech.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tech.items.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <CardDescription className="text-xs">{item.description}</CardDescription>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
