import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];
const publicRoutes = ["/", "/theory", "/components", "/login", "/register"];

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET as string });
  const { pathname } = req.nextUrl;

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
