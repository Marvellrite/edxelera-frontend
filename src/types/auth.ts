import type { AuthRole } from "@/lib/auth";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
};
