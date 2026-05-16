import requireAccess from "@/lib/services/require-access";
import React from "react";

export default async function adminLayout({children}:{children:React.ReactNode}){
    await requireAccess({allowedRoles: ['admin']})

    return {children}
}