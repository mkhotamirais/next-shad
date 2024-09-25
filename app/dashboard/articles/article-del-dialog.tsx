"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Article } from "@prisma/client";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ArticleDelDialog({ article }: { article: Article }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setPending(true);
    await axios
      .delete(`/api/articles/${article.id}`)
      .then((res) => {
        toast.success(res.data.message);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setPending(false);
        document.getElementById(`dialog-close-${article.id}`)?.click();
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"}>
          <FaTrashCan />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <span className="italic text-primary">{article?.title}</span> , Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="flex gap-2 pt-4">
            <Button variant={"destructive"} disabled={pending} onClick={onDelete}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
            <DialogClose asChild>
              <Button disabled={pending}>Cancel</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
