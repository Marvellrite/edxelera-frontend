"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Toaster } from "@/shared/components/ui/toaster";

export type ToastVariant = "success" | "info" | "error" | "warning";

export type Toast = {
  id: string;
  variant: ToastVariant;
  title?: string;
  message?: string;
  duration?: number;
};

type ToastInput =
  | string
  | {
      variant?: ToastVariant;
      title?: string;
      message?: string;
      duration?: number;
    };

type ToastContextValue = {
  toasts: Toast[];
  addToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const defaultToastDuration = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const addToast = useCallback(
    (toastInput: ToastInput) => {
      const id = createToastId();
      const toast =
        typeof toastInput === "string"
          ? { id, variant: "info" as const, message: toastInput }
          : { id, variant: "info" as const, ...toastInput };

      setToasts((currentToasts) => [...currentToasts, toast]);

      if (toast.duration !== 0) {
        window.setTimeout(
          () => removeToast(id),
          toast.duration ?? defaultToastDuration,
        );
      }

      return id;
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [addToast, removeToast, toasts],
  );

  return createElement(
    ToastContext.Provider,
    { value },
    children,
    createElement(Toaster, { toasts, onDismiss: removeToast }),
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

function createToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
}
