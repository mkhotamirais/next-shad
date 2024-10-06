import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";
import ArticleDelDialog from "./article-del-dialog";

export default async function ArticlesList({ q }: { q: string }) {
  const articles = await db.article.findMany({
    orderBy: { createdAt: "desc" },
    where: { title: { contains: q, mode: "insensitive" } },
  });
  // { where: { name: { contains: q, mode: "insensitive" } } }
  if (!articles) return <div>no data found</div>;

  if (articles?.length === 0) return <div className="flex justify-center mt-8 italic">No data found</div>;

  return (
    <div className="space-y-2">
      {articles?.map((item) => (
        <div key={item.id} className="group relative border rounded p-3 overflow-hidden">
          <h3 className="text-primary text-lg capitalize">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.content}</p>
          <div className="z-10 absolute -translate-y-full group-hover:translate-y-0 right-0 top-0 p-2 flex gap-2 transition">
            <Button asChild size={"icon"}>
              <Link href={`/dashboard/articles/update/${item.id}`}>
                <FaPenToSquare />
              </Link>
            </Button>
            <ArticleDelDialog article={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
