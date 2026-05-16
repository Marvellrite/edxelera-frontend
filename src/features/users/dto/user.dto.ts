import type { AuthRole } from "@/shared/types/auth/user-role";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};
