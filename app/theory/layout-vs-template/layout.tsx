import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function LvsTLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container bg-secondary">
      <div className="p-2 flex flex-col gap-2 justify-center items-center">
        <div className="flex justify-center gap-2">
          <Button>
            <Link href="/theory/layout-vs-template/layout">Layout</Link>
          </Button>
          <Button>
            <Link href="/theory/layout-vs-template/template">Template</Link>
          </Button>
        </div>
        <p className="text-center">
          Kita buat layout dan template menjadi client lalu buat counter state sederhana. Ubah state terlebih dahulu
          dengan menekan tombol plus atau minus lalu coba ganti page (home atau page1)
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
