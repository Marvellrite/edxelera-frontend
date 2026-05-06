export type AuthRole = "student" | "instructor" | "admin";

export function isKnownRole(role: string): role is AuthRole {
  return role === "student" || role === "instructor" || role === "admin";
}
