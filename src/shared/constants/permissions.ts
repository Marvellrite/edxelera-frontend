import type { AuthRole } from "@/shared/types/auth-role";

export const protectedRouteRoles: Record<string, AuthRole> = {
  "/home": "student",
  "/instructor": "instructor",
  "/admin": "admin",
};
