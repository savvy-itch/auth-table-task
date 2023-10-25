import LoginForm from '@/components/LoginForm';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-orange-200">
      <LoginForm />
      <Toaster />
    </main>
  )
}