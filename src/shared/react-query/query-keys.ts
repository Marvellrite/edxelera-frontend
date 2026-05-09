export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    detail: (slug: string) =>
      [...queryKeys.courses.all, "detail", slug] as const,
    progress: (courseId: string) =>
      [...queryKeys.courses.all, "progress", courseId] as const,
  },
  assessments: {
    all: ["assessments"] as const,
    attempt: (attemptId: string) =>
      [...queryKeys.assessments.all, "attempt", attemptId] as const,
    result: (attemptId: string) =>
      [...queryKeys.assessments.all, "result", attemptId] as const,
  },
  users: {
    all: ["users"] as const,
    detail: (userId: string) => [...queryKeys.users.all, userId] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
  transactions: {
    all: ["transactions"] as const,
  },
} as const;
