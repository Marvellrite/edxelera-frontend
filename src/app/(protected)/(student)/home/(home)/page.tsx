'use client';

import { continueLearningMock, alsoMayLikeMock } from '@/features/learning/mock';
import { CourseCard } from '@/features/courses/components/';
import ContinueLearningCarousel from '@/features/learning/components/continue-learning-carousel';
import SeeAllButton from '@/components/ui/view-all-link';
import StreakDisplay from '@/features/streak/components/streak-display';

const Page: React.FC = () => {

   return (
      <section className="relative overflow-hidden p-4 py-8 sm:p-6 sm:py-10 lg:p-8 lg:py-12">
         <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_10%_0%,hsl(var(--primary)/0.18),transparent),radial-gradient(90%_70%_at_100%_100%,hsl(var(--primary)/0.1),transparent)]" />
         <div className="space-y-10">
            {/* For Users that have started learning a course */}
            <div className="rounded-2xl border border-primary/20 bg-background/85 p-3 shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.55)] backdrop-blur-sm sm:p-4">
               <div className="mb-4 flex items-center justify-start gap-3 sm:mb-5">
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                        Keep the momentum
                     </p>
                     <h2 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                        Continue your learning journey
                     </h2>
                  </div>
                  {/* <Button
                     className="rounded-full border border-primary/20 bg-primary/10 px-4 text-primary hover:bg-primary/15"
                     variant="ghost"
                  >
                     Dashboard
                  </Button> */}
               </div>
               <div className="flex flex-col gap-3 lg:flex-row">
                  <StreakDisplay />
                  <ContinueLearningCarousel data={continueLearningMock} />
               </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-[0_16px_50px_-30px_hsl(var(--foreground)/0.5)] sm:p-6">
               <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
                  <div>
                     <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                        You may also like
                     </h3>
                     <p className="text-sm text-muted-foreground">
                        Curated picks based on your current learning activity.
                     </p>
                  </div>
                  <SeeAllButton />
               </div>

               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {alsoMayLikeMock.map((data, index) => (
                     <div
                        key={index}
                        className="transition-transform duration-300 ease-out hover:-translate-y-1"
                     >
                        <CourseCard hideCta {...data} />
                     </div>
                  ))}
               </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-[0_16px_50px_-30px_hsl(var(--foreground)/0.5)] sm:p-6">
               <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
                  <div>
                     <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                        Recently viewed courses
                     </h3>
                     <p className="text-sm text-muted-foreground">
                        Jump right back into courses you explored before.
                     </p>
                  </div>
                  <SeeAllButton />
               </div>

               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {alsoMayLikeMock.map((data, index) => (
                     <div
                        key={index}
                        className="transition-transform duration-300 ease-out hover:-translate-y-1"
                     >
                        <CourseCard hideCta {...data} />
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <>
         {/* For Users that have not started learning a course yet */}
         
          {/* <div className=" space-y-9">
            <div className=" h-[252px] bg-primary rounded-xl flex items-end">
               <div className=" mt-auto flex justify-between items-end text-white p-6 pb-7 basis-full max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-4 max-md:py-3.5">
                  <div className=" space-y-2">
                     <h1 className=" text-[24px] max-md:mb-1">
                        Product Design (UI/UX)
                     </h1>
                     <div className=" font-bold text-md">&#8358;150,000.00</div>
                     <div>8 weeks</div>
                  </div>
                  <div>
                     <Button className="bg-white rounded-[500px] h-[47px] w-[147px] text-primary py-3 px-2.5 font-medium text-[14px]">
                        Enroll Now
                     </Button>
                  </div>
               </div>
            </div>

            <div>
               <div className=" text-md font-normal mb-3 flex justify-between">
                  <span>Explore our courses</span>
                  <Button
                     className=" rounded-[500px] text-accent"
                     variant={'ghost'}
                  >
                     See all
                  </Button>
               </div>

               <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
                  {alsoMayLikeMock.map((data, index) => (
                     <CourseCard key={index} {...data} />
                  ))}
               </div>
            </div>
         </div>  */}
         
         </>

      </section>
   );
};

export default Page;
