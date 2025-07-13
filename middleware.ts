import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

// Define protected paths for each role
const BOARD_ONLY_PATHS = ["/dashboard/board"];
const MEMBER_ONLY_PATHS = ["/dashboard/signup"];

export const config = {
	matcher: ["/dashboard/:path*"],
};
