import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticlesList from "./articles-list";
import { Suspense } from "react";
import LoaderClip from "@/components/loader-clip";
import { SearchArticle } from "./articles-query";

export const revalidate = 0;

export default function ArticlesPage({ searchParams: { q } }: { searchParams: { q: string } }) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-primary text-2xl font-semibold">ArticlesPage</h2>
        <Button asChild>
          <Link href="/dashboard/articles/create">Create New</Link>
        </Button>
      </div>
      <SearchArticle />
      <Suspense key={q} fallback={<LoaderClip />}>
        <ArticlesList q={q} />
      </Suspense>
    </div>
  );
}
