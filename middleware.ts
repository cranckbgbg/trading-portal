import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Route protection (B-09). Customer area requires a session; admin area requires
// the ADMIN role. Path prefixes below match the URLs produced by the (customer)
// and (admin) route groups (groups themselves are invisible in the URL).
const CUSTOMER_PREFIXES = ["/account", "/reservations", "/documents", "/checkout"];
const ADMIN_PREFIXES = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role;

  const isAdminPath = ADMIN_PREFIXES.some((p) => pathname.startsWith(p));
  const isCustomerPath = CUSTOMER_PREFIXES.some((p) => pathname.startsWith(p));

  if (!token && (isAdminPath || isCustomerPath)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminPath && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/reservations/:path*",
    "/documents/:path*",
    "/checkout/:path*",
    "/admin/:path*"
  ]
};
