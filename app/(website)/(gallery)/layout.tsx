import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
	title: "FTD Website",
	description: "FTD main website for information and resources",
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-black flex flex-col min-h-screen">
			<Navbar />
			<main className="pt-[100px] flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
