import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ROUTES from "./shared/config/routes";
import { isProtected, isPublic } from "./shared/utils/routes/route-guards";
import { ACCESS_TOKEN_COOKIE } from "./shared/config/auth";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const pathname = req.nextUrl.pathname


  if(isPublic(pathname)){
    return NextResponse.next()
  }

  if ( isProtected(pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

// const protectedPrefixes = ROUTES.protectedPrefixes.map((route)=>`${route}/:path*`)

export const config = {
  // matcher: ["/home/:path*"],
  matcher: ['/home/:path*', '/instructor/:path*', '/admin/:path*'],
};
