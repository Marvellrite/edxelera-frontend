import type { AuthRole } from "@/shared/types/auth-role";

export type AuthUserDto = {
  id: string;
  email: string;
  role: AuthRole;
  name?: string;
};
