import { AuthForms } from "@/components/auth/auth-form";

export default  async function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
         
        </div>

        <AuthForms />
      </div>
    </div>
  );
}
