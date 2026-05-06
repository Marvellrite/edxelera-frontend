import type { AuthRole } from "@/lib/auth";

export type AuthState = {
  userId: string | null;
  role: AuthRole | null;
};

export const initialAuthState: AuthState = {
  userId: null,
  role: null,
};
