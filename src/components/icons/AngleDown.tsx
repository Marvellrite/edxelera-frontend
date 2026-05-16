import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAngleDown = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={9}
      fill="none"
      {...props}
   >
      <path
         stroke="#939393"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeMiterlimit={10}
         strokeWidth={1.5}
         d="M14.75.75 8.987 7.18c-.68.76-1.794.76-2.474 0L.75.75"
      />
   </svg>
);
export default SvgAngleDown;
