"use client";

import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginOauth() {
  const [pendingGithub, setPendingGithub] = useState(false);
  const [pendingGoogle, setPendingGoogle] = useState(false);
  const loginGithub = async () => {
    setPendingGithub(true);
    await signIn("github", { redirectTo: "/dashboard" })
      .then(() => {
        console.log("login github success");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPendingGithub(false));
  };

  const loginGoogle = async () => {
    setPendingGoogle(true);
    await signIn("google", { redirectTo: "/dashboard" })
      .then(() => {
        console.log("login google success");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPendingGoogle(false));
  };

  return (
    <div className="grid grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-2 py-2">
      <Button variant={"outline"} onClick={loginGithub}>
        {pendingGithub ? <Loader2 className="mr-2 animate-spin size-4" /> : <FaGithub className="mr-2" />}
        Login With Github
      </Button>
      <Button variant={"outline"} onClick={loginGoogle}>
        {pendingGoogle ? <Loader2 className="mr-2 animate-spin size-4" /> : <FaGoogle className="mr-2" />}
        Login With Google
      </Button>
    </div>
  );
}
