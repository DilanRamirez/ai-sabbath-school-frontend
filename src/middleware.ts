// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPublicRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (isPublicRoute || request.nextUrl.pathname === "/")) {
    return NextResponse.redirect(new URL("/quarters", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/quarters/:path*", "/cohorts/:path*", "/login", "/register"],
};
