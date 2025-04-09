"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { HomeIcon, CalendarIcon, PlusCircleIcon, ClipboardListIcon } from "lucide-react";

type TabItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    permission?: string;
}

const ALL_TABS: TabItem[] = [
    {
        label: "Home",
        href: "/dashboard",
        icon: HomeIcon
    },
    {
        label: "Calendar",
        href: "/dashboard/calendar",
        icon: CalendarIcon
    },
    {
        label: "Post Performance",
        href: "/dashboard/board",
        icon: PlusCircleIcon,
        permission: "board"
    },
    {
        label: "Performance Signup",
        href: "/dashboard/signup",
        icon: ClipboardListIcon,
        permission: "member"
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, getPermission } = useKindeBrowserClient();
    const [tabs, setTabs] = useState<TabItem[]>([]);

    useEffect(() => {
        async function filterTabs() {
            const filteredTabs = [];

            for (const tab of ALL_TABS) {
                if (!tab.permission) {
                    filteredTabs.push(tab);
                    continue;
                }

                const permissions = await getPermission(tab.permission);
                if (permissions?.isGranted) {
                    filteredTabs.push(tab);
                }
            }

            setTabs(filteredTabs);
        }

        filterTabs();
    }, [user, getPermission]);

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
                            <Icon className={`mr-3 h-5 w-5 ${isActive ? "text-jujube" : "text-gray-500"}`} />
                            {tab.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}