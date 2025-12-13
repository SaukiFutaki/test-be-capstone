"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export function AuthForms() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Masuk</TabsTrigger>
        <TabsTrigger value="register">Daftar</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-6">
        <LoginForm />
      </TabsContent>

      <TabsContent value="register" className="mt-6">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  )
}
