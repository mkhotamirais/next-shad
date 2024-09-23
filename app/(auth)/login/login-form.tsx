"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const LoginSchema = z.object({
=======
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const LoginSchema = z.object({
>>>>>>> 0364184 (err1)
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginType = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [pending, setPending] = useState(false);
<<<<<<< HEAD
  // const router = useRouter();
=======
  const router = useRouter();
>>>>>>> 0364184 (err1)

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
<<<<<<< HEAD
  const onSubmit = async (values: LoginType) => {
    setPending(true);
    console.log(values);
    // const { email, password } = values;
    // await account
    //   // .createEmailPasswordSession(email, password)
    //   .then(() => {
    //     // setUser();
    //     toast.success("Login successful");
    //     router.push("/");
    //     router.refresh();
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   })
    //   .finally(() => {
    //     setPending(false);
    //   });
=======

  const onSubmit = async (values: LoginType) => {
    setPending(true);
    await axios
      .post(`/api/auth/login`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        router.push("/dashboard");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setPending(false);
      });
>>>>>>> 0364184 (err1)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={pending} type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={pending} type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
