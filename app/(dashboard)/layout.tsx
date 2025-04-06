import type { Metadata } from "next";
import "../globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/image/ftd_logo.png";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "FTD Dashboard",
  description: "FTD Members Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();
  
  // Check if user is authenticated
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/unauthorized");
  }
  
  return (
    <div className="flex flex-col h-screen">
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b z-20 flex items-center justify-between px-7">
        <Link href="/dashboard" className="flex items-center">
          <Image src={logo} height={100} alt="logo" />
        </Link>
        
        <LogoutLink className="flex items-center text-sm text-gray-600 hover:text-jujube transition-colors">
          <LogOutIcon className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Sign Out</span>
        </LogoutLink>
      </header>

      <div className="flex flex-1 pt-16"> 
        <div className="fixed left-0 top-16 bottom-0 w-64 z-10 bg-white border-r">
          <Sidebar />
        </div>
        
        <div className="ml-64 flex-1 overflow-hidden">
          <main className="p-6 h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
