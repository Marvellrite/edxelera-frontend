import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSort = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
   >
      <path
         stroke="#2C2C2C"
         strokeLinecap="round"
         d="M2 4.667h12M4 8h8M6.667 11.334h2.666"
      />
   </svg>
);
export default SvgSort;
