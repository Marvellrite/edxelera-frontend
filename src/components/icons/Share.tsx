import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export default function Share({ size = 28, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10.5 14.875L17.5 10.792M10.5 13.125L17.5 17.208"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.75"
        cy="14"
        r="2.625"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="19.25"
        cy="9.625"
        r="2.625"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="19.25"
        cy="18.375"
        r="2.625"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}
