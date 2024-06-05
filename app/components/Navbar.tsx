"use client";

import Link from "next/link";
import { use, useState } from "react";
import Image from "next/image"; 
import logo from "../../public/image/ftd_logo.png"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    function getMenuClasses() {
        let menuClasses = ["md:block", "md:flex-row"];

        if (isOpen) {
            menuClasses = [
                "flex-col",
                "flex",
                "absolute",
                "left-1/2",
                "top-[100px]",
                "gap-5"
            ];
        } else {
            menuClasses.push("hidden");
        }

        return menuClasses.join(" ");
    }

    return (
        <nav className="bg-white text-white p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between items-center">
                <Image src={logo} height={100} alt="logo" />
                <div className={getMenuClasses()}>
                    <Link href="/" className="text-black text-sm mx-2 hover:text-primary">
                        Home
                    </Link>
                    <Link href="/about" className="text-black text-sm mx-2 hover:text-primary">
                        About Us
                    </Link>
                    <Link href="/gallery" className="text-black text-sm mx-2 hover:text-primary">
                        Gallery
                    </Link>
                    <Link href="/events" className="text-black text-sm mx-2 hover:text-primary">
                        Events
                    </Link>
                    <Link href="/join" className="text-black text-sm mx-2 hover:text-primary">
                        Join Us
                    </Link>
                    <Link href="/contact" className="text-black text-sm mx-2 hover:text-primary">
                        Contact
                    </Link>
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