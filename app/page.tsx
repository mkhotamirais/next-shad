"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }

  return (
    <section className="py-32">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1>Welcomeee</h1>
          <p>Description</p>
          <Button size={"lg"}>Action</Button>
        </div>
      </div>
    </section>
  );
}
