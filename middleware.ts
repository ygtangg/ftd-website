import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  function middleware() {
  },
  {
    isReturnToCurrentPage: true
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
}