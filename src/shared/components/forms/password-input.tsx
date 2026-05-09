import type { InputHTMLAttributes } from "react";
import { Input } from "@/shared/components/ui/input";

export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="password" autoComplete="current-password" {...props} />;
}
