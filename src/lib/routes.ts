export const routes = {
  public: {
    home: "/",
    explore: "/explore",
    about: "/about-us",
    contact: "/contact-us",
  },
  auth: {
    signIn: "/auth",
    signUp: "/auth/sign-up",
  },
  student: {
    home: "/home",
    courses: "/home/my-courses",
  },
  instructor: {
    home: "/instructor",
    courses: "/instructor/courses",
  },
  admin: {
    home: "/admin",
    users: "/admin/users",
  },
} as const;
