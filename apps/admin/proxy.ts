import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/account", "/checkout", "/orders", "/admin", "/dashboard"];

export function proxy(req: NextRequest) {
  console.log('proxy was triggered')
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const sessionToken = req.cookies.get("_Host_session")?.value;
  if (!sessionToken) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
