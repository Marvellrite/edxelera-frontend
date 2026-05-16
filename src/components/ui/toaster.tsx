"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";
import type { Toast, ToastVariant } from "@/lib/hooks/use-toast";

type ToasterProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

const toastStyles: Record<
  ToastVariant,
  {
    container: string;
    icon: string;
    title: string;
    message: string;
    iconNode: ReactNode;
  }
> = {
  success: {
    container: "border-green-600 bg-green-200",
    icon: "bg-success text-success-foreground",
    title: "Success",
    message: "You have purchased this course.",
    iconNode: <SuccessIcon />,
  },
  info: {
    container: "border-primary bg-blue-200",
    icon: "bg-primary text-primary-foreground",
    title: "Did you know?",
    message: "You can enroll in more than one course at a time.",
    iconNode: <InfoIcon />,
  },
  error: {
    container: "border-destructive bg-red-200",
    icon: "bg-destructive text-destructive-foreground",
    title: "Did you know?",
    message: "You can enroll in more than one course at a time.",
    iconNode: <ErrorIcon />,
  },
  warning: {
    container: "border-orange-600 bg-orange-200",
    icon: "bg-orange-600 text-primary-foreground",
    title: "Did you know?",
    message: "You can enroll in more than one course at a time.",
    iconNode: <WarningIcon />,
  },
};

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-relevant="additions text"
      className="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-[401px] flex-col gap-3 sm:right-6 sm:top-6"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const styles = toastStyles[toast.variant];
  const title = toast.title ?? styles.title;
  const message = toast.message ?? styles.message;

  return (
    <section
      role={toast.variant === "error" ? "alert" : "status"}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-2 p-4 shadow-sm",
        toast.variant === "success" ? "min-h-[84px]" : "min-h-[108px]",
        styles.container,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            styles.icon,
          )}
          aria-hidden="true"
        >
          {styles.iconNode}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold leading-6 text-foreground">
            {title}
          </h2>
          <p className="mt-1 text-base leading-6 text-neutral-600">
            {message}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="flex size-6 shrink-0 items-center justify-center rounded-sm text-neutral-600 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <CloseIcon />
      </button>
    </section>
  );
}

function SuccessIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5L9.5 17L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 19H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.75 16H14.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 10C8 7.8 9.8 6 12 6C14.2 6 16 7.8 16 10C16 11.3 15.35 12.35 14.45 13.05C13.85 13.52 13.5 14.16 13.5 14.75V15H10.5V14.75C10.5 14.16 10.15 13.52 9.55 13.05C8.65 12.35 8 11.3 8 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6.5V13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 17.5H12.01"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
