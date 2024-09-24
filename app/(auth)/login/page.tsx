import { Metadata } from "next";
import { LoginForm } from "./login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginOauth from "./login-oauth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Page",
  description: "This project uses nextjs and appwrite",
};

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="container">
      <div className="max-w-md mx-auto my-16 border rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-3">Login</h1>
        <LoginOauth />
        <LoginForm />
        <Button asChild variant={"link"} className="mt-4 mx-auto w-full">
          <Link href="/register">Do not have an account?</Link>
        </Button>
      </div>
    </section>
  );
}
