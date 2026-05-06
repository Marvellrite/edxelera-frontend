import type { AuthRole } from "@/lib/auth";

export const protectedRouteRoles: Record<string, AuthRole> = {
  "/home": "student",
  "/instructor": "instructor",
  "/admin": "admin",
};
