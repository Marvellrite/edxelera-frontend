'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type LearningPreviewTileProps = {
   posterSrc: string;
   title: string;
   duration: string;
};

const LearningPreviewTile: React.FC<LearningPreviewTileProps> = ({
   posterSrc,
   title,
   duration,
}) => {
   return (
      // <div className="  relative max-md:flex-none max-md:basis-full max-md:max-w-none max-w-[374px] grow  rounded-lg ">
      <div className="  relative flex-none basis-full max-w-none grow  rounded-lg ">
         <Image
            src={posterSrc}
            className=" object-cover "
            alt="Video Poster"
            fill
         />
         <div className=" absolute bg-black/30 w-full h-full left-0 top-0 flex justify-end flex-col p-4 px-3 ">
            <div className='flex justify-between'>
               <div className=" flex flex-col -space-y-1">
                  <p className=" text-white text-md font-medium leading-[150%]">
                     {title}
                  </p>
                  <p className=" font-normal text-[14px] text-white">{duration}</p>
               </div>

               <div><Button className=' h-9 text-xs font-medium px-3.5 py-2.5'>Go to Course</Button></div>

            </div>
         </div>

         {/* <Button
            className=" hover:cursor-pointer rounded-[500px] size-[58px] bg-white absolute top-1/2 left-1/2 -translate-1/2 flex justify-center items-center hover:bg-white"
            variant="ghost"
         >
            <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340565/repo-images/public/icons/play.svg" />
         </Button> */}
      </div>
   );
};

export default LearningPreviewTile