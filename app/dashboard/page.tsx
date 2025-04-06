import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
  const { getPermissions, isAuthenticated } = getKindeServerSession();
  
  // Check if user is authenticated
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/unauthorized");
  }
  
    // Redirect based on role
  const permission = await getPermissions();
    if (permission && permission.permissions.includes("board")) {
    redirect("/dashboard/board");
  } else if (permission && permission.permissions.includes("member")) {
    redirect("/dashboard/member");
  } else {
    redirect("/unauthorized");
  }
}
