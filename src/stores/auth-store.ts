import type { AuthRole } from "@/shared/types/auth-role";

export type AuthState = {
  userId: string | null;
  role: AuthRole | null;
};

export const initialAuthState: AuthState = {
  userId: null,
  role: null,
};
