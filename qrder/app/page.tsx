import { LoginForm } from "@/components/auth/LoginForm";
import { APP_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ebe4d8_0%,_transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Welcome to
          </p>
          <h1 className="mt-1 font-serif text-4xl font-bold text-dark">
            {APP_NAME}
          </h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
