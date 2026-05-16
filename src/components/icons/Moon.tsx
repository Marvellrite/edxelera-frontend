import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMoon = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
   >
      <path
         fill="#fff"
         d="M17.624 13.145c-.128-.216-.488-.553-1.384-.393-.496.088-1 .128-1.504.104a6.73 6.73 0 0 1-4.728-2.255c-1.04-1.16-1.68-2.673-1.688-4.305 0-.912.176-1.792.536-2.624.352-.808.104-1.232-.072-1.408-.184-.184-.616-.44-1.464-.088a8.25 8.25 0 0 0-5.056 8.169c.24 3.303 2.56 6.127 5.632 7.192a8 8 0 0 0 2.312.44q.192.014.384.015a8.4 8.4 0 0 0 6.776-3.416c.536-.744.392-1.216.256-1.431"
      />
   </svg>
);
export default SvgMoon;
