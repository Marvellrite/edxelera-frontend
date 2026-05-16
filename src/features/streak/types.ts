export interface StreakProps {
    status: 'active'| 'none' | 'inactive';
    day: 'S' | 'M' |'T' | 'W'| 'T' | 'F' | 'S';
    isCurrentDay?: boolean
}
