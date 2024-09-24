import { Button } from "@/components/ui/button";
import Link from "next/link";
import GalleryList from "./gallery-list";

export const revalidate = 0;

export default function GalleryPage() {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-primary text-lg font-semibold">Gellery</h1>
        <Button asChild>
          <Link href="/dashboard/gallery/create">Create New</Link>
        </Button>
      </div>
      <div>
        <GalleryList />
      </div>
    </div>
  );
}
