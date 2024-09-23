"use client";

// import ProtectedPage from "@/components/protected-page";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

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
