"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Loader2, TrendingDown, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface PredictionData {
  id: number
  age: number
  job: string
  marital: string
  education: string
  prediction_result: string
  prediction_probability: number
  created_at: string
}

export function PredictionHistory() {
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
      toast.error("Anda harus login terlebih dahulu.")
        return
      }

      const response = await fetch("http://localhost:5000/api/predict", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (response.ok && result.status === "success") {
        setPredictions(result.data)
      }
    } catch (error) {
        toast.error("Gagal memuat riwayat prediksi.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (predictions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Prediksi</CardTitle>
          <CardDescription>Belum ada data prediksi</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">Upload file CSV/Excel untuk memulai prediksi</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Prediksi</CardTitle>
        <CardDescription>Menampilkan {predictions.length} hasil prediksi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Umur</TableHead>
                <TableHead>Pekerjaan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pendidikan</TableHead>
                <TableHead>Probabilitas</TableHead>
                <TableHead>Hasil</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow key={prediction.id}>
                  <TableCell className="font-mono text-sm">{prediction.id}</TableCell>
                  <TableCell>{prediction.age}</TableCell>
                  <TableCell className="capitalize">{prediction.job}</TableCell>
                  <TableCell className="capitalize">{prediction.marital}</TableCell>
                  <TableCell className="capitalize">{prediction.education}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{(prediction.prediction_probability * 100).toFixed(2)}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={prediction.prediction_result === "YES" ? "default" : "secondary"} className="gap-1">
                      {prediction.prediction_result === "YES" ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      {prediction.prediction_result}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(prediction.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
