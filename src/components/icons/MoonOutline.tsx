import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMoonOutline = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
   >
      <path
         stroke="#6E6E6E"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1.2}
         d="M2.025 10.336c.288 4.12 3.784 7.472 7.968 7.656a8.4 8.4 0 0 0 7.176-3.416c.656-.888.304-1.48-.792-1.28a7.6 7.6 0 0 1-1.664.112C10.8 13.248 7.6 9.976 7.585 6.112a7.1 7.1 0 0 1 .6-2.92c.432-.992-.088-1.464-1.088-1.04C3.929 3.488 1.76 6.68 2.025 10.336"
      />
   </svg>
);
export default SvgMoonOutline;
