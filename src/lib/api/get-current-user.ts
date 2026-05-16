import { apiEndpoints } from "../constants/api-endpoints"
import { User } from "@/shared/types"
import { http } from "./api-client"

const getCurrentUser = async ():Promise<User>=>{
    console.log("I am here")
    return await http.get(`${apiEndpoints.auth}/me`)
}

export default getCurrentUser