"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Upload, Loader2, FileSpreadsheet } from "lucide-react"
import { UploadFormData, uploadSchema } from "@/schemas/predict-schema"


export function UploadForm() {
  const [isPending, startTransition] = useTransition()
  const [fileName, setFileName] = useState<string>("")

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit = async (data: UploadFormData) => {
    startTransition(async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error("Error", {
            description: "Token tidak ditemukan. Silakan login kembali.",
          })
          return
        }

        const formData = new FormData()
        formData.append("file", data.file[0])

        const response = await fetch(`http://localhost:5000/api/predict`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        const result = await response.json()

        if (response.ok && result.status === "success") {
          toast.success("Upload berhasil!", {
            description: `${result.data.length} data berhasil diproses dan diprediksi.`,
          })
          form.reset()
          setFileName("")
          window.location.reload()
        } else {
          toast.error("Upload gagal", {
            description: result.message || "Terjadi kesalahan saat upload file",
          })
        }
      } catch (error) {
        toast.error("Error", {
          description: "Terjadi kesalahan saat upload. Pastikan API backend berjalan.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Pilih File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  disabled={isPending}
                  onChange={(e) => {
                    onChange(e.target.files)
                    setFileName(e.target.files?.[0]?.name || "")
                  }}
                  {...field}
                  className="cursor-pointer"
                />
              </FormControl>
              {fileName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileSpreadsheet className="size-4" />
                  <span>{fileName}</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Mengunggah...
            </>
          ) : (
            <>
              <Upload className="mr-2 size-4" />
              Upload & Prediksi
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Format yang didukung: CSV, XLSX, XLS. Pastikan file sesuai dengan format yang diperlukan.
        </p>
      </form>
    </Form>
  )
}
