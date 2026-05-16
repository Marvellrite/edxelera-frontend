import type UserRole from "@/lib/types/auth/user-role";

const roleRank: Record<UserRole, number> = {
  student: 1,
  instructor: 2,
  admin: 3,
};

export function hasRoleAccess(role: UserRole, minimumRole: UserRole) {
  return roleRank[role] >= roleRank[minimumRole];
}
