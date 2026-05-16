"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/react-query/query-keys";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => null,
    enabled: false,
  });
}
