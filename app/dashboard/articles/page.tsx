import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getArticles } from "./actions";
import ArticlesList from "./articles-list";

export default async function ArticlesPage() {
  const articles = await getArticles();
  if (!articles) return <div>no articles</div>;

  return (
    <div>
      <div className="container">
        <div className="flex py-4 items-center justify-between">
          <h2>ArticlesPage</h2>
          <Button asChild>
            <Link href="/dashboard/articles/create">Create New</Link>
          </Button>
        </div>
        <ArticlesList articles={articles} />
      </div>
    </div>
  );
}
