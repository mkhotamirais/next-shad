"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
<<<<<<< HEAD
// import { account } from "@/appwrite/config";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const RegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
=======
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
>>>>>>> 0364184 (err1)
    password: z.string().min(1, "Password is required"),
    confPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });

type RegisterType = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const [pending, setPending] = useState(false);
<<<<<<< HEAD
  // const router = useRouter();
=======
  const router = useRouter();
>>>>>>> 0364184 (err1)

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", confPassword: "" },
  });
  const onSubmit = async (values: RegisterType) => {
    setPending(true);
<<<<<<< HEAD
    console.log(values);
    // const { email, password } = values;
    // await account
    //   // .create("unique()", email, password)
    //   .then(() => {
    //     toast.success("Account created successfully");
    //     router.push("/login");
    //   })
    //   .catch(() => {
    //     toast.error("Register failed");
    //   })
    //   .finally(() => {
    //     setPending(false);
    //   });
=======
    await axios
      .post(`/api/auth/register`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        router.push("/login");
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
<<<<<<< HEAD
=======
              <FormMessage />
>>>>>>> 0364184 (err1)
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={pending} type="password" placeholder="********" {...field} />
              </FormControl>
<<<<<<< HEAD
=======
              <FormMessage />
>>>>>>> 0364184 (err1)
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit" className="w-full">
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
