import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import refreshAction from "./api/refreshAction";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/panel-placowki")) {
    const isLogged = await refreshAction();
    if (!isLogged) return NextResponse.error();
    return NextResponse.next();
  }

  if (process.env.NODE_ENV == "production") {
    const authPaths = ["/logowanie", "/rejestracja"];
    const isAuthPath = authPaths.some(path =>
      request.nextUrl.pathname.startsWith(path),
    );

    if (isAuthPath) return NextResponse.error();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
