import Link from "next/link";
import { Button } from "./ui/button";

export default function ProtectedPage() {
  return (
    <div>
      <div className="container py-24">
        <div className="max-w-lg border rounded p-5 bg-destructive/10 mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <h1>You are not logged in, please login!</h1>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
