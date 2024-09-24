"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-center">
          <h1>Welcome {session?.user?.email}</h1>
        </div>
      </div>
    </div>
  );
}
