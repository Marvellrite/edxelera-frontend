import type UserRole from "@/lib/types/auth/user-role";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};
