type SidebarProps = {
  label: string;
};

export function Sidebar({ label }: SidebarProps) {
  return (
    <aside className="border-r border-zinc-200 bg-white p-4 text-sm">
      {label}
    </aside>
  );
}
