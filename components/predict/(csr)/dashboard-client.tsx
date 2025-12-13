"use client";

import { PredictionHistory } from "@/components/predict/(csr)/predict-history";
import { UploadForm } from "@/components/predict/(csr)/upload-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    () => {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center"></div>
            <span className="text-xl font-semibold text-foreground">
              BankScoreAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

    {/* MAIN */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Upload file CSV/Excel untuk mendapatkan prediksi
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload File Prediksi</CardTitle>
              <CardDescription>
                Upload file CSV atau Excel (.csv, .xlsx, .xls) yang berisi data
                pelanggan untuk diproses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </div>

        <PredictionHistory />
      </main>
    </div>
  );
}
