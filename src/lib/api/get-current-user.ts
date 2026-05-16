import { apiEndpoints } from "../constants/api-endpoints"
import { User } from "@/lib/types"
import { http } from "./client"

type GetCurrentUserResponseDTO = {
    success: boolean,
    message: string,
    data: User
}

type getCurrentUserAPIParams = {
    cookies: string
}

const getCurrentUserAPI = async ({cookies}:getCurrentUserAPIParams):Promise<GetCurrentUserResponseDTO>=>{
    const response = await http.get<GetCurrentUserResponseDTO>(`${apiEndpoints.auth}/me`, {cookies})
    return response
}

export default getCurrentUserAPI