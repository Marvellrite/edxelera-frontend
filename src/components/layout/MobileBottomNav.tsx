'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Home, Search, Book, People, User, HomeOutline, SearchOutline, BookOutline, PeopleOutline, UserOutline } from '@/components/icons/';


const MobileBottomNav: React.FC = () => {
   const pathname = usePathname();
   const activeLink = '*:text-primary *:font-bold';
   const isCourseOverviewPage = /^\/home\/explore\/overview\/\d+$/.test(pathname);
   const links = [
      {
         href: '/home',
         label: 'Home',
         Icon: Home,
         IconOutline: HomeOutline,
      },
      {
         href: '/home/explore',
         label: 'Explore',
         Icon: Search,
         IconOutline: SearchOutline,
      },
      {
         href: '/home/my-courses',
         label: 'My Courses',
         Icon: Book,
         IconOutline: BookOutline,
      },
      {
         href: '/home/community',
         label: 'Community',
         Icon: People,
         IconOutline: PeopleOutline,
      },
      {
         href: '/home/my-profile',
         label: 'Profile',
         Icon: User,
         IconOutline: UserOutline,
      },
   ];

   return (
      <footer className={` ${isCourseOverviewPage && 'hidden'} grid md:hidden grid-cols-5 h-20 items-center justify-center *:flex *:flex-col *:justify-center *:items-center *:text-tab border-t border-neutral-100 `}>
         {links.map((link) =>{
           
        const isActive = pathname === link.href
           
        return (
        <Link
            key={link.href}
            href={link.href}
            className={`flex gap-1 hover:cursor-pointer items-center ${pathname === link.href ? activeLink : '*:text-neutral-700'}`}
        >
            {React.createElement(isActive ? link.Icon : link.IconOutline, {
                width: 25,
                height: 25,
                })}
            <span className="text-nowrap">{link.label}</span>
        </Link>)
        } 
    )}
    </footer>
         )}


export default MobileBottomNav