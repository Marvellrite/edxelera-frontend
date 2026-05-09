import type { ReactNode } from "react";
import { DashboardLayout } from "@/shared/components/layout/dashboard-layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout title="Admin workspace">{children}</DashboardLayout>;
}
