import { FireCold, FireNone, FireHot } from '@/components/icons/'
import { cn } from '@/lib/utils/utils'
import { StreakProps } from '../types'


const StreakDay = ({status, day, isCurrentDay=false}:StreakProps) => {
  return (
    <div style={{flexBasis:'11.7%'}} className=' flex flex-col justify-center gap-1.5 relative'>
        <p className=' text-md font-medium w-fit self-center'>{day}</p>
        <div  className={cn(' relative flex items-center justify-center aspect-square rounded-full ', status==='active'?'bg-streak-fg-active': status==='inactive'?'bg-streak-fg-inactive':'bg-neutral-400')}>{
            status==='active'?<FireHot className='aspect-[21/28] h-fit' width={'50%'} height={'auto'}/>: status==='inactive'?<FireCold className='aspect-[21/28] h-fit' width={'50%'} height={'auto'}/>:<FireNone className='aspect-[21/28] h-fit' width={'50%'} height={'auto'}/>
        }
           {
            isCurrentDay &&
        <div className='size-2.25 rounded-full absolute right-0 top-0 bg-streak-active-marker -translate-x-1/2 translate-y-1/2'></div>
        }
        </div>
     
    </div>
  )
}

export default StreakDay