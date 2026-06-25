import { APP_NAME } from "@/lib/constants";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center text-dark">
      <h1 className="mb-3 font-serif text-3xl font-semibold">{APP_NAME}</h1>
      <p className="max-w-sm text-muted">
        You are offline. Check your internet connection and try again.
      </p>
    </main>
  );
}
