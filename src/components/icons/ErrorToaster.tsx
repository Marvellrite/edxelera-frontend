import * as React from 'react';
import type { SVGProps } from 'react';
const SvgErrortoaster = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
   >
      <path
         fill="#6C0507"
         d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12"
      />
      <path
         stroke="#fff"
         strokeLinecap="round"
         strokeWidth={1.179}
         d="m7 7 10 10M17.213 7l-10 10"
      />
   </svg>
);
export default SvgErrortoaster;
