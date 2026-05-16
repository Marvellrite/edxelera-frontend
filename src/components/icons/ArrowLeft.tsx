import * as React from 'react';
import IconProp from './IconType';
const SvgBackArrow = ({size=24, ...props}: IconProp)=> (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="5.5 6.5 20 17"
      {...props}
   >
      <path
         fill="currentColor"
         d="M25.143 16a1.143 1.143 0 0 0 0-2.286V16M6.049 14.049a1.143 1.143 0 0 0 0 1.616l7.273 7.273a1.143 1.143 0 0 0 1.616-1.616l-6.465-6.465 6.465-6.465a1.143 1.143 0 0 0-1.616-1.616zm19.094.808v-1.143H6.857V16h18.286z"
      />
   </svg>
);
export default SvgBackArrow;
