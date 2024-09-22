"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = { email: string; password: string };

export function Form2Page() {
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
        <h1>with useForm</h1>
        <Input
          {...register("email", {
            // required: true,
            // validate: (value) => value.includes("@"),
            // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required: "email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return (value = "email must include @");
              }
              return true;
            },
            // validate: (value) => (value = "1"),
          })}
          type="text"
          placeholder="email"
        />
        {errors.email && <div className="text-red-500">{errors.email?.message}</div>}
        <Input
          {...register("password", {
            // required: true,
            required: "password is required",
            // minLength: 6,
            minLength: {
              value: 6,
              message: "Password must have at least 6 chars",
            },
          })}
          type="password"
          placeholder="******"
        />
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "loading.." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
