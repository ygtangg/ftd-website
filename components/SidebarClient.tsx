"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, PlusCircleIcon, ClipboardListIcon } from "lucide-react";
import { TabItem } from "@/types/TabItem";

const ALL_TABS: TabItem[] = [
	{
		label: "Home",
		href: "/dashboard",
		icon: HomeIcon,
	},
	{
		label: "Calendar",
		href: "/dashboard/calendar",
		icon: CalendarIcon,
	},
	{
		label: "Post Performance",
		href: "/dashboard/board",
		icon: PlusCircleIcon,
		permission: "board",
	},
	{
		label: "Performance Signup",
		href: "/dashboard/signup",
		icon: ClipboardListIcon,
		permission: "member",
	},
];

export default function SidebarClient({ role }: { role: string | null }) {
	const pathname = usePathname();

	const tabs = ALL_TABS.filter((tab) => !tab.permission || tab.permission === role);

	return (
		<div className="h-screen flex flex-col bg-white border-r w-64 fixed">
			<nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = pathname === tab.href;

					return (
						<Link
							key={tab.href}
							href={tab.href}
							className={`flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors ${
								isActive
									? "bg-jujube/10 text-jujube"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<Icon
								className={`mr-3 h-5 w-5 ${isActive ? "text-jujube" : "text-gray-500"}`}
							/>
							{tab.label}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
