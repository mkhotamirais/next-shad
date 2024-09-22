"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex items-center justify-center">
        <small>
          Copyright © {new Date().getFullYear()}, <Link href="/">NextShad</Link>
        </small>
      </div>
    </footer>
  );
}
