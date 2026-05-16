import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-full bg-zinc-50">
      <aside className="hidden w-64 border-r border-border bg-card p-6 md:block">
        <p className="text-lg font-semibold">EdXelera</p>
        <p className="mt-2 text-sm">{title}</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border bg-card px-6 py-4">
          <p className="text-sm font-medium">{title}</p>
        </header>
        <main className="flex flex-1">{children}</main>
      </div>
    </div>
  );
}
