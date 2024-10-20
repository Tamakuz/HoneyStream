import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type MiddlewareConfig = {
  matcher: string[];
};

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXT_PUBLIC_AUTH_SECRET }) as any | null;
  const { pathname } = request.nextUrl;

  // Prevent redirection loop by checking if the request is for the API or static files
  if (pathname.includes('/api/') || pathname.includes('/_next/')) {
    return NextResponse.next();
  }

  if (session) {
    if ((pathname === "/login" || pathname === "/signup") && request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!["/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
