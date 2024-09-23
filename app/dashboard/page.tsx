// import { useSession } from "next-auth/react";

import { LogoutBtn } from "@/components/home/logout-btn";

export default function DashboardPage() {
  // const { data: session } = useSession();

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-center">
          <h1>Welcome</h1>
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
