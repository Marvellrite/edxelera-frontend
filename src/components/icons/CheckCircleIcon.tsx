import * as React from "react";

type CheckCircleIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  circleColor?: string;
  checkColor?: string;
};

export default function CheckCircleIcon({
  size = 20,
  circleColor = "#ED1C24",
  checkColor = "white",
  ...props
}: CheckCircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="20" height="20" rx="10" fill={circleColor} />
      <path
        d="M5 10.7977L8.35125 14.1488L15.8333 6.66666"
        stroke={checkColor}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}