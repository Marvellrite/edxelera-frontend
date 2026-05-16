import requireAccess from "@/lib/services/require-access";
import React from "react";

export default async function studentLayout({children}:{children:React.ReactNode}){
    await requireAccess({allowedRoles: ['student']})

    return {children}
}