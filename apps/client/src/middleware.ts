import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import refreshAction from "./api/refreshAction";

export async function middleware(request: NextRequest) {
  const isLogged = await refreshAction();
  if (!isLogged) return NextResponse.error();
  return NextResponse.next();
}

export const config = {
  matcher: ["/panel-placowki"],
};
