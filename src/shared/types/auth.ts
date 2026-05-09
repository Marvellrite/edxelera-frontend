import type { AuthRole } from "@/shared/types/auth-role";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
};
