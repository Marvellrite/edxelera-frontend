"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import resolveQueryClient from "@/lib/react-query/resolve-query-client";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = resolveQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
