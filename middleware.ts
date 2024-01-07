import { NextRequest, NextResponse } from "next/server";
import { deserialize } from "wagmi";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("wagmi.store");
  const isConnected = cookie && deserialize(cookie.value).state.current;
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard) {
    if (isConnected) return;
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (isConnected) {
    NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg$).*)"],
};
