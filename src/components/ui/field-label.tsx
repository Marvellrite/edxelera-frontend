import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/shared/utils/utils";

export const fieldLabelTypes = ["none", "required", "optional"] as const;

export type FieldLabelType = (typeof fieldLabelTypes)[number];

type FieldLabelProps = {
  children: ReactNode;
  className?: string;
  helpIcon?: ReactNode;
  optionalText?: string;
  showHelpIcon?: boolean;
  type?: FieldLabelType;
} & ComponentPropsWithoutRef<"label">;

export function FieldLabel({
  children,
  className,
  helpIcon = <MessageQuestionIcon />,
  optionalText = "(Optional)",
  showHelpIcon = false,
  type = "none",
  ...props
}: FieldLabelProps) {
  return (
    <label
      className={cn(
        "relative flex w-fit items-center gap-3 text-base font-normal leading-6",
        className,
      )}
      {...props}
    >
      {type === "required" ? (
        <span
          aria-hidden="true"
          className="absolute -left-2 top-0.5 text-base font-normal leading-none"
        >
          *
        </span>
      ) : null}
      <span>{children}</span>
      {showHelpIcon ? (
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center [--stroke-0:currentColor] [&_svg]:size-6"
        >
          {helpIcon}
        </span>
      ) : null}
      {type === "optional" ? (
        <span className="text-base font-normal leading-6">
          {optionalText}
        </span>
      ) : null}
    </label>
  );
}

function MessageQuestionIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 18H13L8.55 20.96C7.89 21.4 7 20.93 7 20.13V18C4 18 2 16 2 13V7C2 4 4 2 7 2H17C20 2 22 4 22 7V13C22 16 20 18 17 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0001 10.93V10.72C12.0001 10.04 12.4201 9.68 12.8401 9.39C13.2501 9.11 13.66 8.75 13.66 8.09C13.66 7.17 12.9201 6.43 12.0001 6.43C11.0801 6.43 10.3401 7.17 10.3401 8.09"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 13.32H12.0045"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
