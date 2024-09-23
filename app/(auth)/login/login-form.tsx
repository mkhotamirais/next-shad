"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginType = z.infer<typeof LoginSchema>;

export function LoginForm() {
  // const { errAuth } = useAuth();
  const [pending, setPending] = useState(false);
  // const router = useRouter();

  const searchParams = useSearchParams();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginType) => {
    setPending(true);
    await axios
      .post(`/api/auth/login`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        // router.push("/dashboard");
        // router.refresh();
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <>
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
      {searchParams.get("error") && (
        <div className="border rounded border-red-500 bg-red-500/15 text-red-500 text-center p-3 mt-4 text-sm">
          Same email registered by another provider
        </div>
      )}
    </>
  );
}
