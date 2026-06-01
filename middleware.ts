import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/trade-setups") ||
      pathname.startsWith("/journal") ||
      pathname.startsWith("/watchlist")) &&
    !["SUBSCRIBER", "ADMIN"].includes(String(role))
  ) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/trade-setups/:path*",
    "/journal/:path*",
    "/watchlist/:path*",
    "/admin/:path*"
  ]
};
