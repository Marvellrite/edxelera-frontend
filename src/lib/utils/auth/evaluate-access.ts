import { UserRole } from "@/shared/types/auth/user-role"

type EvaluateAccessParams = { userRole: UserRole, allowedRoles: UserRole[]}


const evaluateAccess = ({userRole, allowedRoles}: EvaluateAccessParams)=>{
    return allowedRoles.includes(userRole) ? { allowed:true } : { allowed:false }
}

export default evaluateAccess;