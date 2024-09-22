"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

export function Form3Page() {
  // const form = useForm<FormFields>()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "default@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        // setError("email", {
        //   message: "this email is already taken",
        // });
        setError("root", {
          message: "this email is already taken",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-xl mx-auto my-8">
        <h1>with useForm + zod</h1>
        <Input {...register("email")} type="text" placeholder="email" />
        {errors.email && <div className="text-red-500">{errors.email?.message}</div>}
        <Input {...register("password")} type="password" placeholder="******" />
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "loading.." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
