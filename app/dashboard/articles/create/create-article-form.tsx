"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type ArticleForm = z.infer<typeof ArticleSchema>;

export default function CreateArticleForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<ArticleForm>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (values: ArticleForm) => {
    setPending(true);
    await axios
      .post(`/api/articles`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        router.push("/dashboard/articles");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={pending} placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea disabled={pending} placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
