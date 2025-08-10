"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import logo from "@/public/image/ftd_logo.png";
import logoWhite from "@/public/image/ftd_logo_white.png";

type Props = { gallery?: boolean };

export const Navbar = ({ gallery = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Background with its own opacity (doesn't fade children)
  const bgColor = gallery ? "bg-black" : "bg-lightpink";

  const linkColor = gallery ? "text-white" : "text-black";
  const hoverColor = gallery ? "hover:text-lightpink" : "hover:text-jujube";

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 shadow-sm",
        bgColor,
        "opacity-85",
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-3 py-2">
        <Link href="/" className="flex items-center">
          <Image src={gallery ? logoWhite : logo} alt="logo" height={84} />
        </Link>

        {/* Desktop menu */}
        <div className={clsx("hidden md:flex items-center gap-4", linkColor)}>
          {[
            ["Home", "/home"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
            ["Repertoires", "/repertoires"],
            ["Events", "/events"],
            ["Join Us", "/join"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={clsx("text-base", hoverColor)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={clsx(
            "md:hidden p-2 rounded",
            gallery ? "text-white" : "text-black",
          )}
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 100 80"
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <>
                <line
                  x1="10"
                  y1="70"
                  x2="90"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="90"
                  y2="70"
                  stroke="currentColor"
                  strokeWidth="10"
                />
              </>
            ) : (
              <>
                <rect width="100" height="12" rx="6" fill="currentColor" />
                <rect
                  y="28"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
                <rect
                  y="56"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden px-6 pb-4 transition-all",
          isOpen ? "block" : "hidden",
          linkColor,
        )}
      >
        <div className="flex flex-col gap-4">
          {[
            ["Home", "/home"],
            ["About Us", "/about"],
            ["Gallery", "/gallery"],
            ["Repertoires", "/repertoires"],
            ["Events", "/events"],
            ["Join Us", "/join"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={clsx("text-base", hoverColor)}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
