import type { AuthRole } from "@/lib/auth";

export type User = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};
