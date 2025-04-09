import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Define protected paths for each role
const BOARD_ONLY_PATHS = ["/dashboard/board"];
const MEMBER_ONLY_PATHS = ["/dashboard/signup"];

export default withAuth(
  async function middleware(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const { getPermission } = getKindeServerSession();

    // Check if path is protected for board members
    if (BOARD_ONLY_PATHS.includes(requestUrl.pathname)) {
      const memberPermission = await getPermission("member");
      if (memberPermission?.isGranted) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Check if path is protected for members
    if (MEMBER_ONLY_PATHS.includes(requestUrl.pathname)) {
      const boardPermission = await getPermission("board");
      if (boardPermission?.isGranted) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/unauthorized",
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
}