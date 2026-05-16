import { StreakProps } from "./types"

export const streakMock:StreakProps[] = [{
    day:'S', status: 'active'
}, {
    day:'M', status: 'inactive'
}, {
    day:'T', status: 'active'
}, {
    day:'W', status: 'active'
}, {
    day:'T', status: 'none', isCurrentDay: true
}, {
    day:'F', status: 'none'
},
{
    day:'S', status: 'none'
},
]