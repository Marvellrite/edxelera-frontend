import type { AuthRole } from "@/shared/types/auth/user-role";

export type AuthUserDto = {
  id: string;
  email: string;
  role: AuthRole;
  name?: string;
};
