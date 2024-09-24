"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }

  return (
    <section className="py-32">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-2xl md:text-4xl text-center font-semibold">Welcome {session?.user?.email}</h1>
          <p className="text-muted-foreground text-center">
            This website utilizes Vercel features, including hosting, database, and storage. It is built using Next.js
            and Prisma.
          </p>
          <Button size={"lg"}>
            <Link href="/dashboard">Getting Started</Link>
          </Button>
          <div></div>
        </div>
      </div>
    </section>
  );
}
