import React from 'react'
import { Flash } from '@/components/icons/'
import StreakDay from './streak-day'
import { streakMock } from '../mock'


const StreakDisplay = () => {
  return (
    <div className=' grow basis-1/2 h-66'>
        <p className=' pb-3 pt-1 text-primary '>Your Streak</p>
        <div className=' rounded-lg bg-streak-surface h-full px-4.5 pt-13.5 pb-4'>
            <div className='space-y-6'>
            <div className=' flex gap-2.5 items-center'>
                <Flash/>
                <span className=' font-medium text-[26px]'>
                    2 days
                </span>
            </div>

            <div className=' flex w-full justify-between'>
                {
                    streakMock.map((_, i)=>
                    
                        <StreakDay key={i} {..._} />
                    )
                }
            </div>

            </div>
        </div>

    </div>
  )
}

export default StreakDisplay