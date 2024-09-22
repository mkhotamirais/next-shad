"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export function Form1Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    if (!email.includes("@")) {
      setErrors({ ...errors, email: "Email must include @" });
      return;
    }
    if (password.length < 6) {
      setErrors({ ...errors, password: "Password must be at least 8 chars" });
      return;
    }

    console.log(errors.email);
    console.log("form submitted");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto my-8">
        <h1>with useState</h1>
        <Input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        {errors.email ? <div className="text-red-500">{errors.email}</div> : null}
        <Input type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <div className="text-red-500">{errors.password}</div>}
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
