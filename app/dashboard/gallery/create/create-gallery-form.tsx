"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GallerySchema = z.object({
  name: z.string().min(1, "Title is required"),
  image: z.instanceof(File, { message: "File is required" }).optional(),
  //   image: z.string().url("Invalid Url").optional(),
});

type GalleryType = z.infer<typeof GallerySchema>;

export default function CreateGalleryForm() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<GalleryType>({
    resolver: zodResolver(GallerySchema),
    defaultValues: { name: "", image: undefined },
  });

  const onSubmit = async (values: GalleryType) => {
    setPending(true);
    const formData = new FormData();
    const { name, image } = values;

    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    await axios
      .post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        router.push("/dashboard/gallery");
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
          name="name"
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  disabled={pending}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const fileUrl = URL.createObjectURL(file);
                      //   setPreview(URL.createObjectURL(file));
                      setPreview(fileUrl);
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Avatar className="rounded-md w-32 h-32 relative">
          {preview && (
            <Button
              disabled={pending}
              size="icon"
              className="absolute m-2"
              onClick={() => {
                setPreview(undefined);
                form.setValue("image", undefined);
              }}
            >
              <Trash className="size-4" />
            </Button>
          )}
          <AvatarImage src={preview || ""} className="rounded-md object-contain bg-gray-200" />
          <AvatarFallback className="rounded-md">bu</AvatarFallback>
        </Avatar>
        <Button disabled={pending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
