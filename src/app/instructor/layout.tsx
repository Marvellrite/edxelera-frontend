import type { ReactNode } from "react";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout";

export default function InstructorLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout title="Instructor workspace">{children}</DashboardLayout>;
}
