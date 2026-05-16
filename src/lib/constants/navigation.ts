import { routes } from "@/lib/constants/routes";

export const navigationConfig = {
  public: [
    { href: routes.public.explore, label: "Explore" },
    { href: routes.public.about, label: "About" },
    { href: routes.public.contact, label: "Contact" },
  ],
  student: [
    { href: routes.student.home, label: "Home" },
    { href: routes.student.courses, label: "My courses" },
  ],
} as const;
