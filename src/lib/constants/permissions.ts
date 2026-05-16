import type { AuthRole } from "@/shared/types/auth/user-role";

export const protectedRouteRoles: Record<string, AuthRole> = {
  "/home": "student",
  "/instructor": "instructor",
  "/admin": "admin",
};
