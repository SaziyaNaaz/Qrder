import { LoginForm } from "@/components/auth/LoginForm";
import { PageBackground } from "@/components/layout/PageBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
