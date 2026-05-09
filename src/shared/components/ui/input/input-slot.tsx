import type { ReactNode } from "react";

export function InputSlot({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <span className="relative z-[1] flex size-6 shrink-0 items-center justify-center [--stroke-0:currentColor] [&_svg]:size-6 [&_svg]:shrink-0">
      {children}
    </span>
  );
}
