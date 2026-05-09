import type { AuthRole } from "@/shared/types/auth-role";

const roleRank: Record<AuthRole, number> = {
  student: 1,
  instructor: 2,
  admin: 3,
};

export function hasRoleAccess(role: AuthRole, minimumRole: AuthRole) {
  return roleRank[role] >= roleRank[minimumRole];
}
