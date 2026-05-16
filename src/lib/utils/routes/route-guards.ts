import ROUTES from "@/lib/config/routes"

const { protectedPrefixes, public:publicRoutes } = ROUTES

export const isPublic = (pathname:string) => {
    return publicRoutes.some((route)=>route==pathname)
}

export const isProtected = (pathname:string)=>{
    return protectedPrefixes.some(prefix=>pathname.startsWith(prefix))
}