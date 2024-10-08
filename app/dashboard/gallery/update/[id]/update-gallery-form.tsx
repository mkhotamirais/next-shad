"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import LoaderClip from "@/components/loader-clip";

const GallerySchema = z.object({
  name: z.string().min(1, "Title is required"),
  image: z.instanceof(File, { message: "File is required" }).optional(),
  //   image: z.string().url("Invalid Url").optional(),
});

type GalleryType = z.infer<typeof GallerySchema>;

export default function UpdateGalleryForm() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [pendingPage, setPendingPage] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<GalleryType>({
    resolver: zodResolver(GallerySchema),
    defaultValues: { name: "", image: undefined },
  });

  useEffect(() => {
    if (!params.id) return;
    setPendingPage(true);
    axios
      .get(`/api/gallery/${params.id}`)
      .then((res) => {
        // form.reset(res.data);
        form.reset({
          name: res.data.name,
        });
        setPreview(res.data.image);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setPendingPage(false);
      });
  }, [params.id, form]);

  const onSubmit = async (values: GalleryType) => {
    console.log(values);
    setPending(true);
    const formData = new FormData();
    const { name, image } = values;

    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    await axios
      .patch(`/api/gallery/${params.id}`, formData, {
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

  if (pendingPage) return <LoaderClip />;

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
              type="button"
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
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
