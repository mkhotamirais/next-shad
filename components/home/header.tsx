"use client";

import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container">
        <div className="h-16 flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <MobileNav />
            <Logo />
          </div>
          <nav>
            <DesktopNav />
          </nav>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
                      {/* <AvatarImage
                        src={
                          "https://lh3.googleusercontent.com/a/ACg8ocIOTbNjzxg6ldq-yiwcgldDQB-Bf8juilreVNz9YSlWoUCWvyU=s96-c"
                        }
                      /> */}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Account</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="relative flex gap-2">
                <Button asChild variant="link" size={"sm"}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size={"sm"}>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}

            <ModeToggle className="hidden md:flex" />
          </div>
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
