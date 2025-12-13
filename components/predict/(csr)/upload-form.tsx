"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Upload, Loader2, FileSpreadsheet } from "lucide-react"
import { toast } from "sonner"

const uploadSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "File harus dipilih")
    .refine((files) => {
      const file = files?.[0]
      if (!file) return false
      const validTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]
      return (
        validTypes.includes(file.type) ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      )
    }, "File harus berformat CSV, XLSX, atau XLS"),
})

type UploadFormData = z.infer<typeof uploadSchema>

export function UploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit = async (data: UploadFormData) => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Anda harus login terlebih dahulu.")
        return
      }

      const formData = new FormData()
      formData.append("file", data.file[0])

      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.status === "success") {
        toast.success("File berhasil diupload dan prediksi selesai.")
        form.reset()
        setFileName("")
        window.location.reload()
      } else {
        toast.error(result.message || "Gagal mengupload file. Coba lagi.")
      }
    } catch (error) {
        toast.error("Terjadi kesalahan saat mengupload file.")
    } finally {
      setIsLoading(false)
    }
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
                  disabled={isLoading}
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
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
