import type UserRole from "@/lib/types/auth/user-role";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
