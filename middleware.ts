import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET as string });
  const { pathname } = req.nextUrl;

  if (!token && pathname === "/dashboard") {
    const url = req.nextUrl.clone();
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
