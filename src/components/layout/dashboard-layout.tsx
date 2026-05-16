'use client'

import { cn } from '@/lib/utils/utils';
// import '../globals.css';
import MobileBottomNav from './MobileBottomNav';

export default function HomeLayoutContent({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   return (
      <main className="flex flex-1 h-screen overflow-y-auto  w-full max-md:flex-col bg-surface-home">
         <section className={cn('@container overflow-y-auto grow flex-1 duration-600 transition-all md:p-0 p-5 pt-0 md:ml-0')}>
            {children}
         </section>
         <MobileBottomNav />
      </main>
   );
}
