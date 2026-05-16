import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSearchOutline = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ||24}
      height={props.height ||24}
      fill="none"
      {...props}
   >
      <path
         stroke="currentColor"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1.5}
         d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19M22 22l-2-2"
      />
   </svg>
);
export default SvgSearchOutline;
