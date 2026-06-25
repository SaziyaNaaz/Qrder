import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";

type AppShellProps = {
  children: ReactNode;
  hideNav?: boolean;
};

export function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="mx-auto max-w-lg">{children}</div>
      {!hideNav ? <BottomNav /> : null}
    </div>
  );
}
