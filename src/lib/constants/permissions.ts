import type UserRole from "@/lib/types/auth/user-role";

export const protectedRouteRoles: Record<string, UserRole> = {
  "/home": "student",
  "/instructor": "instructor",
  "/admin": "admin",
};
