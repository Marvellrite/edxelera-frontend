import type UserRole from "@/lib/types/auth/user-role";

export type AuthState = {
  userId: string | null;
  role: UserRole | null;
};

export const initialAuthState: AuthState = {
  userId: null,
  role: null,
};
