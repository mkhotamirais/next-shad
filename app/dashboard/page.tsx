"use client";

import { Input } from "@/components/ui/input";
import { navList } from "@/lib/nav-list";
import { useSession } from "next-auth/react";
import Link from "next/link";

const subMenuDashboard = navList.find((item) => item.label === "Dashboard")?.subMenu;

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="py-4">
      <h1 className="text-lg pb-2 font-semibold">Welcome {session?.user?.email} to your dashboard</h1>
      <Input placeholder="Search here.." />
      <div className="grid grid-cols-4 py-4 gap-4">
        {subMenuDashboard?.map((item, index) => (
          <Link href={item.href} key={index} className="border rounded p-3">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
