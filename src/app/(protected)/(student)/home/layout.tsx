import type { ReactNode } from "react";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout title="Student workspace">{children}</DashboardLayout>;
}
