import requireAccess from "@/lib/services/require-access";
import React from "react";

export default async function instructorLayout({children}:{children:React.ReactNode}){
    await requireAccess({allowedRoles: ['instructor']})

    return {children}
}