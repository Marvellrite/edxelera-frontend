'use client'
import { FC } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import LearningPreviewTile from './learning-preview-tile';
import { Button } from '@/components/ui/button';
import { useDotButtonsContinueLearningCarousel } from '@/features/learning/hooks';

interface ContinueLearningProps {
   data: {
      posterSrc: string;
      title: string;
      duration: string;
   }[];
}

const ContinueLearningCarousel: FC<ContinueLearningProps> = ({ data }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel({
      dragFree: true,
   });
   const { selectedIndex, scrollSnaps, scrollTo } = useDotButtonsContinueLearningCarousel(emblaApi!);

   return (
      <div className=" basis-1/2 grow ">
         <div className=" text-md font-normal mb-3 flex justify-between items-center">
            <div className='text-base text-primary'>Continue learning</div>{' '}
            <div className=" space-x-2">
               {/* <Button className=" p-0 bg-primary w-4 h-[8px] rounded-[4px]" active/>{' '}
               <Button className=" p-0 bg-neutral-400 h-[8px] w-[8px] rounded-[4px]" /> */}
               {scrollSnaps.map((_, index) => (
                  <Button
                     key={index}
                     className={` hover:cursor-pointer p-0 rounded-sm h-2   ${index === selectedIndex ? 'bg-primary w-4' : 'bg-neutral-400 w-2'}`}
                     onClick={() => scrollTo(index)}
                  />
               ))}
            </div>
         </div>
         <div ref={emblaRef} className=" overflow-x-hidden rounded-lg overflow-hidden">
            <div className=" flex h-66 flex-nowrap w-full  gap-0 ">
               {data.map((data, index) => (
                  <LearningPreviewTile key={index} {...data} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default ContinueLearningCarousel;
