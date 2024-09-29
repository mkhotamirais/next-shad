"use client";

import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

import AuthBtn from "./auth-btn";

export function Header() {
  return (
    <header className="border-b">
      <div className="container">
        <div className="h-16 flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <MobileNav />
            <Logo />
          </div>
          <nav className="flex items-center gap-6">
            <DesktopNav />
            <AuthBtn />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="font-semibold text-lg">
      NEXT<span className="text-primary">SHAD</span>
    </Link>
  );
};
