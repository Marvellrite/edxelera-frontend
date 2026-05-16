import type { UserRole } from "@/lib/types/auth/user-role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
