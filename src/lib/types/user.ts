import type { UserRole } from "@/shared/types/auth/user-role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
