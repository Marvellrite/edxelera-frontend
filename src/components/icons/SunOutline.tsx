import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSunOutline = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
   >
      <path
         stroke="#E8E8E8"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1.2}
         d="M10 15.2a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4"
      />
      <path
         stroke="#E8E8E8"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1.6}
         d="m15.712 15.712-.104-.104m0-11.216.104-.104zm-11.32 11.32.104-.104zM10 2.064V2zM10 18v-.064zm-7.936-8H2zM18 10h-.064zM4.392 4.392l-.104-.104z"
      />
   </svg>
);
export default SvgSunOutline;
