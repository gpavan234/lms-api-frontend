import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // Not logged in → redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Decode token to check role (simplified for now)
    try {
      const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
      if (payload.role !== "admin") {
        // Not an admin → redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect student dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Match paths
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
