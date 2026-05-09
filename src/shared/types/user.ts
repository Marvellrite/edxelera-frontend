import type { AuthRole } from "@/shared/types/auth-role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};
