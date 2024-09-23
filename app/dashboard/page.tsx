"use client";

import ProtectedPage from "@/components/protected-page";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return <ProtectedPage />;

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-center">
<<<<<<< HEAD
          <h1>Welcome {session?.user?.name}</h1>
=======
          <h1>Welcome {session?.user?.email}</h1>
>>>>>>> 0364184 (err1)
        </div>
      </div>
    </div>
  );
}
