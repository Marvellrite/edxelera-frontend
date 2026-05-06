import type { ReactNode } from "react";

type CourseGridProps = {
  children: ReactNode;
};

export function CourseGrid({ children }: CourseGridProps) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
