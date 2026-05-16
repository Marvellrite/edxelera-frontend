"use client";

import type { ReactNode } from "react";
import Link from "next/link";
// import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

type SeeAllButtonProps = {
  className?: string;
  children?: ReactNode;
  href?: string;
};

const SeeAllButton: React.FC<SeeAllButtonProps> = ({
  className,
  children = "See all",
  href,
}) => {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      <span>{children}</span>
      {/* <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /> */}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group inline-flex h-auto rounded-full px-0 py-0 text-sm font-medium text-primary/80",
          "transition-colors duration-200 hover:bg-transparent hover:text-primary",
          "focus-visible:bg-transparent focus-visible:ring-primary/20",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "group h-auto rounded-full px-0 py-0 text-sm font-medium text-primary/80",
        "transition-colors duration-200 hover:bg-transparent hover:text-primary",
        "focus-visible:bg-transparent focus-visible:ring-primary/20",
        className,
      )}
    >
      {content}
    </Button>
  );
};

export default SeeAllButton;
