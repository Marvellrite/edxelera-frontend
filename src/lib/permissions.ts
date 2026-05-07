import type { AuthRole } from "@/lib/auth";

const roleRank: Record<AuthRole, number> = {
  student: 1,
  instructor: 2,
  admin: 3,
};

export function hasRoleAccess(role: AuthRole, minimumRole: AuthRole) {
  return roleRank[role] >= roleRank[minimumRole];
}
