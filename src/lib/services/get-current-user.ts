import { User } from "@/lib/types"
import { extractRequestCookies } from "@/lib/server/request"
import { getCurrentUserAPI } from "../api"


const getCurrentUser = async ():Promise<User>=>{
    const cookies = await extractRequestCookies()
    const response = await getCurrentUserAPI({cookies})
    return response.data as User
}

export default getCurrentUser