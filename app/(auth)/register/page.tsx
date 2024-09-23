import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./register-form";
<<<<<<< HEAD
=======
import { auth } from "@/auth";
import { redirect } from "next/navigation";
>>>>>>> 0364184 (err1)

export const metadata: Metadata = {
  title: "Register Page",
  description: "This project uses nextjs and appwrite",
};

<<<<<<< HEAD
export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto my-16 border rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Register Page</h1>
      <RegisterForm />
      <Button asChild variant={"link"} className="mt-4 mx-auto w-full">
        <Link href="/login">Already have an account?</Link>
      </Button>
    </div>
=======
export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="container">
      <div className="max-w-md mx-auto my-16 border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Register Page</h1>
        <RegisterForm />
        <Button asChild variant={"link"} className="mt-4 mx-auto w-full">
          <Link href="/login">Already have an account?</Link>
        </Button>
      </div>
    </section>
>>>>>>> 0364184 (err1)
  );
}
