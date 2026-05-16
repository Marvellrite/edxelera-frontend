import { User } from "@/shared/types"
import { UserRole } from "@/shared/types/auth/user-role"
import evaluateAccess from "@/shared/utils/auth/evaluate-access"
import { redirect } from 'next/navigation'
import ROUTES from "@/shared/config/routes"
import getCurrentUser from "@/shared/api/get-current-user"

type RequireAccessParams = {
    allowedRoles: UserRole[]
}

const requireAccess = async ({allowedRoles}: RequireAccessParams)=>{

    const user = await getCurrentUser()

    const access = evaluateAccess({userRole:user.role, allowedRoles})

    if(!access.allowed) redirect(ROUTES.unauthorized)
}

export default requireAccess