import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import { FaPenToSquare } from "react-icons/fa6";
import GalleryDelDialog from "./gallery-del-dialog";
import Link from "next/link";

export default async function GalleryList() {
  const data = await db.gallery.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {data.map((item) => (
        <div key={item.id} className="relative group border rounded overflow-hidden">
          <Image
            src={item.image}
            width={500}
            height={500}
            className="object-cover object-center h-48"
            alt="image blob"
          />
          <h2 className="text-center p-2 font-semibold capitalize">{item.name}</h2>
          <div className="absolute p-2 top-0 right-0 -translate-y-full transition group-hover:translate-y-0 flex gap-2">
            <Button asChild size="icon">
              <Link href={`/dashboard/gallery/${item.id}`}>
                <FaPenToSquare />
              </Link>
            </Button>
            <GalleryDelDialog gallery={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
