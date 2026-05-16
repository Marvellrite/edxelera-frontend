import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
   >
      <path
         fill="#2C2C2C"
         d="M7 2h10c2.76 0 5 2.23 5 4.98v6.98c0 2.75-2.24 4.98-5 4.98h-1.5c-.27 0-.63.18-.8.4l-1.5 1.99c-.66.88-1.74.88-2.4 0l-1.5-1.99c-.19-.25-.49-.4-.8-.4H7c-2.76 0-5-2.23-5-4.98V6.98C2 4.23 4.24 2 7 2m9 10c.56 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .44 1 1 1m-4 0c.56 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .44 1 1 1m-4 0c.56 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .44 1 1 1"
      />
   </svg>
);
export default SvgMessage;
