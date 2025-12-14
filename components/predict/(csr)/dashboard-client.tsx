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
import { useAuth } from "@/components/providers/auth-providers";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { FileUp, CheckCircle2, Eye, Download } from "lucide-react";

export function DashboardClient() {
  const { user, logout } = useAuth();
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="BankScoreAI Logo"
                width={32}
                height={32}
              />
            </div>
            <span className="text-xl font-semibold text-foreground">
              BankScoreAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button size="sm" onClick={logout} className="cursor-pointer">
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

        <Collapsible
          open={isTutorialOpen}
          onOpenChange={setIsTutorialOpen}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition-opacity">
                <div>
                  <CardTitle>Cara Menggunakan BankScoreAI</CardTitle>
                  <CardDescription>
                    Panduan langkah demi langkah untuk prediksi kredit
                  </CardDescription>
                </div>
                <ChevronDown
                  className={`size-5 text-muted-foreground transition-transform ${
                    isTutorialOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center ">
                      <FileUp className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        1. Upload File
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Siapkan file CSV atau Excel yang berisi data pelanggan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center ">
                      <CheckCircle2 className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        2. Proses AI
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Sistem akan menganalisis data dengan algoritma machine
                        learning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center ">
                      <Eye className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        3. Lihat Hasil
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan prediksi kelayakan kredit dalam hitungan detik
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center ">
                      <Download className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        4. Download
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Unduh hasil prediksi untuk dokumentasi dan analisis
                        lebih lanjut
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

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
