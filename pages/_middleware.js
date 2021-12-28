import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // TOKEN WILL EXIST IF USER IS LOGGED IN
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
  // Allow the requests if the following is true...
  // 2) it's a request for next-auth session & provider fetching
  // 1) Token exist
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
