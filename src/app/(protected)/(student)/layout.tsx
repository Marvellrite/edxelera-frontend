import React from "react";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import resolveQueryClient from '@/lib/react-query/resolve-query-client';
import HomeLayoutContent from '@/components/layout/dashboard-layout';
import { reactQueryDehydrateOptions } from '@/lib/react-query/hydration';
import requireAccess from "@/lib/services/require-access";
import { queryKeys } from "@/lib/react-query/query-keys";
import { getCurrentUserAPI } from "@/lib/api";
import { extractRequestCookies } from "@/lib/server/request";

export default async function StudentLayout({children}:{children:React.ReactNode}){
    const queryClient = resolveQueryClient();
    const cookies = await extractRequestCookies()
    const user = await queryClient.fetchQuery({
        queryKey: queryKeys.auth.me('student'),
        queryFn: ()=>getCurrentUserAPI({cookies})
    })
    await requireAccess({ role:user.data.role, allowedRoles: ['student']})

    return (
    <HydrationBoundary state={dehydrate(queryClient, reactQueryDehydrateOptions)}>
        <HomeLayoutContent>
        {children}
        </HomeLayoutContent>
    </HydrationBoundary>
    )
    
}
