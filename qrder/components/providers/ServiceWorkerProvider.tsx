"use client";

import { SerwistProvider } from "@serwist/turbopack/react";
import type { ReactNode } from "react";

type ServiceWorkerProviderProps = {
  children: ReactNode;
};

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  return (
    <SerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV === "development"}
    >
      {children}
    </SerwistProvider>
  );
}
