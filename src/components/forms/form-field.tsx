import type { ReactNode } from "react";
import {
  FieldLabel,
  type FieldLabelType,
} from "@/components/ui/field-label";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
  labelType?: FieldLabelType;
};

export function FormField({
  label,
  children,
  hint,
  labelType = "none",
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <FieldLabel showHelpIcon={false} type={labelType}>
        {label}
      </FieldLabel>
      {children}
      {hint ? <span className="text-xs font-normal text-zinc-500">{hint}</span> : null}
    </div>
  );
}
