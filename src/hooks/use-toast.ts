"use client";

import { useCallback, useState } from "react";

export type Toast = {
  id: string;
  message: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: crypto.randomUUID(), message },
    ]);
  }, []);

  return { toasts, addToast };
}
