import * as React from 'react';
import type { SVGProps } from 'react';
const SvgX = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      fill="none"
      {...props}
   >
      <path
         stroke="currentColor"
         strokeLinecap="round"
         strokeWidth={1.5}
         d="m.75.75 12.728 12.728M13.75.75 1.022 13.478"
      />
   </svg>
);
export default SvgX;
