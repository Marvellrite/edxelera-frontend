import { cookies } from "next/headers";

export default async function extractRequestCookies(){

    const cookieStore = await cookies();
    return cookieStore.toString()
}