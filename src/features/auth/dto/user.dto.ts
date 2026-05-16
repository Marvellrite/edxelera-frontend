import type UserRole from "@/lib/types/auth/user-role";

export type AuthUserDto = {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
};
