import z from "zod"

export const uploadSchema = z.object({
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

export type UploadFormData = z.infer<typeof uploadSchema>
