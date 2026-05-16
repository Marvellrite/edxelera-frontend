import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";

export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="password" autoComplete="current-password" {...props} />;
}
