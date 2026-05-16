import UserRole from "@/lib/types/auth/user-role"
import evaluateAccess from "@/lib/utils/auth/evaluate-access"
import { redirect } from 'next/navigation'
import ROUTES from "@/lib/config/routes"
import getCurrentUser from "./get-current-user"

type RequireAccessParams = {
    allowedRoles: UserRole[]
}

const requireAccess = async ({allowedRoles}: RequireAccessParams)=>{

    const user = await getCurrentUser()

    console.log("user==>", user)

    const access = evaluateAccess({userRole:user.role, allowedRoles})

    if(!access.allowed) redirect(ROUTES.unauthorized)
}

export default requireAccess