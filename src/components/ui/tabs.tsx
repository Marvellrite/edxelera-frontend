import type { ReactNode } from "react";

type TabsProps = {
  children: ReactNode;
};

export function Tabs({ children }: TabsProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
