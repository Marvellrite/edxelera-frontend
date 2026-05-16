type SidebarProps = {
  label: string;
};

export function Sidebar({ label }: SidebarProps) {
  return (
    <aside className="border-r border-border bg-card p-4 text-sm">
      {label}
    </aside>
  );
}
