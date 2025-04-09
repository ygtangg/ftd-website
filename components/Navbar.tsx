"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; 
import logo from "../public/image/ftd_logo.png"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogInIcon } from "lucide-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    function getMenuClasses() {
        let menuClasses = ["md:flex md:items-center", "md:space-x-1 lg:space-x-3"];

        if (isOpen) {
            menuClasses = [
                "flex-col",
                "flex",
                "absolute",
                "pl-6",
                "top-[100px]",
                "gap-5",
                "w-full",
                "bg-white"
            ];
        } else {
            menuClasses.push("hidden");
        }

        return menuClasses.join(" ");
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-white md:flex md:justify-between md:items-center shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image src={logo} height={100} alt="logo" />
                </Link>
                <div className={getMenuClasses()}>
                    <Link href="/" className="text-black text-base mx-2 hover:text-jujube">
                        Home
                    </Link>
                    <Link href="/about" className="text-black text-base mx-2 hover:text-jujube">
                        About Us
                    </Link>
                    <Link href="/gallery" className="text-black text-base mx-2 hover:text-jujube">
                        Gallery
                    </Link>
                    <Link href="/events" className="text-black text-base mx-2 hover:text-jujube">
                        Events
                    </Link>
                    <Link href="/join" className="text-black text-base mx-2 hover:text-jujube">
                        Join Us
                    </Link>
                    <Link href="/contact" className="text-black text-base mx-2 hover:text-jujube">
                        Contact
                    </Link>
                    <LoginLink className="flex items-center text-black text-base mx-2 hover:text-jujube">
                        <LogInIcon className="mr-1 h-4 w-4" />
                        Sign In
                    </LoginLink>
                </div>
                <div className={ "md:hidden flex items-center"}>
                    <button 
                        className="text-black"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <svg viewBox="0 0 100 100" 
                            width="16" 
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <>
                                    <line x1="0" y1="100" x2="100" y2="0" stroke-width="15" stroke="black"/>
                                    <line x1="0" y1="0" x2="100" y2="100" stroke-width="15" stroke="black"/>
                                </>
                            ) : (
                                <>
                                    <rect width="100" height="20" rx="10"></rect>
                                    <rect y="30" width="100" height="20" rx="10"></rect>
                                    <rect y="60" width="100" height="20" rx="10"></rect>
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}