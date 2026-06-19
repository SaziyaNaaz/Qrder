import { APP_NAME } from "@/lib/constants";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 text-center text-white">
      <h1 className="mb-3 text-3xl font-semibold">{APP_NAME}</h1>
      <p className="max-w-sm text-muted">
        You are offline. Check your internet connection and try again.
      </p>
    </main>
  );
}
