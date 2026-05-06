import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-full bg-zinc-50">
      <aside className="hidden w-64 border-r border-zinc-200 bg-white p-6 md:block">
        <p className="text-lg font-semibold text-zinc-950">EdXelera</p>
        <p className="mt-2 text-sm text-zinc-500">{title}</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white px-6 py-4">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
        </header>
        <main className="flex flex-1">{children}</main>
      </div>
    </div>
  );
}
