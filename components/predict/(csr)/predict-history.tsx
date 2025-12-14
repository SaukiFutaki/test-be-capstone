"use client";

import { PredictionData } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table-components/data-table";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { columnsDemo } from "./column";



export function PredictionHistory() {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Anda harus login terlebih dahulu.");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setPredictions(result.data);
      }
    } catch (error) {
      toast.error("Gagal memuat riwayat prediksi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Prediksi</CardTitle>
          <CardDescription>Belum ada data prediksi</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">
            Upload file CSV/Excel untuk memulai prediksi
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Prediksi</CardTitle>
        <CardDescription>
          Menampilkan {predictions.length} hasil prediksi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columnsDemo} data={predictions} />
      </CardContent>
    </Card>
  );
}
