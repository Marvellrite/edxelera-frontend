import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      fill="none"
      {...props}
   >
      <rect
         width={46.5}
         height={46.5}
         x={-0.75}
         y={0.75}
         stroke="currentColor"
         strokeWidth={1.5}
         rx={23.25}
         transform="matrix(-1 0 0 1 46.5 0)"
      />
      <path
         fill="currentColor"
         d="M27.59 24.4v4.07c0 .36-.04.7-.13 1.01-.37 1.47-1.59 2.39-3.27 2.39h-2.72l-3.02 2.01a.671.671 0 0 1-1.05-.56v-1.45c-1.02 0-1.87-.34-2.46-.93-.6-.6-.94-1.45-.94-2.47V24.4c0-1.9 1.18-3.21 3-3.38.13-.01.26-.02.4-.02h6.79c2.04 0 3.4 1.36 3.4 3.4"
      />
      <path
         fill="currentColor"
         d="M29.75 27.6c1.27 0 2.34-.42 3.08-1.17.75-.74 1.17-1.81 1.17-3.08v-5.1C34 15.9 32.1 14 29.75 14h-8.5C18.9 14 17 15.9 17 18.25V19c0 .28.22.5.5.5h6.69c2.71 0 4.9 2.19 4.9 4.9v2.7c0 .28.22.5.5.5z"
      />
   </svg>
);
export default SvgChat;
