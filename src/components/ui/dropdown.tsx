import type { ReactNode } from "react";

type DropdownProps = {
  label: string;
  children: ReactNode;
};

export function Dropdown({ label, children }: DropdownProps) {
  return (
    <details className="relative">
      <summary className="cursor-pointer rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium">
        {label}
      </summary>
      <div className="absolute right-0 z-10 mt-2 min-w-48 rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
        {children}
      </div>
    </details>
  );
}
