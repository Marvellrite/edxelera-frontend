import UserRole from "../types/auth/user-role";

export const queryKeys = {
  auth: {
    me: (role: UserRole) => ["auth", "me", role] as const,
  },

  courses: {
    all: (role: UserRole) => ["courses", role] as const,

    lists: (role: UserRole) =>
      [...queryKeys.courses.all(role), "list"] as const,

    detail: (role: UserRole, slug: string) =>
      [...queryKeys.courses.all(role), "detail", slug] as const,

    progress: (role: UserRole, courseId: string) =>
      [...queryKeys.courses.all(role), "progress", courseId] as const,
  },

  assessments: {
    all: (role: UserRole) => ["assessments", role] as const,

    attempt: (role: UserRole, attemptId: string) =>
      [...queryKeys.assessments.all(role), "attempt", attemptId] as const,

    result: (role: UserRole, attemptId: string) =>
      [...queryKeys.assessments.all(role), "result", attemptId] as const,
  },

  users: {
    all: (role: UserRole) => ["users", role] as const,

    detail: (role: UserRole, userId: string) =>
      [...queryKeys.users.all(role), userId] as const,
  },

  notifications: {
    all: (role: UserRole) => ["notifications", role] as const,
  },

  transactions: {
    all: (role: UserRole) => ["transactions", role] as const,
  },
} as const;