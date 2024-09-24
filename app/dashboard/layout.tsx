"use client";

import LoaderClip from "@/components/loader-clip";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container">
        <LoaderClip />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return <div className="container">{children}</div>;
}
