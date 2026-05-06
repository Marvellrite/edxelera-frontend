import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
};

export function FormField({ label, children, hint }: FormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-700">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-zinc-500">{hint}</span> : null}
    </label>
  );
}
