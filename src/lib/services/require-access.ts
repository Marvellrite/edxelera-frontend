import UserRole from "@/lib/types/auth/user-role"
import evaluateAccess from "@/lib/utils/auth/evaluate-access"
import { redirect } from 'next/navigation'
import ROUTES from "@/lib/config/routes"
import getCurrentUser from "./get-current-user"

type RequireAccessParams = {
    role: UserRole;
    allowedRoles: UserRole[]
}

const requireAccess = async ({role, allowedRoles}: RequireAccessParams)=>{

    // const user = await getCurrentUser()

    const access = evaluateAccess({userRole:role, allowedRoles})

    if(!access.allowed) redirect(ROUTES.unauthorized)
}

export default requireAccess