import type { AuthRole } from "@/shared/types/auth/user-role";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
};
