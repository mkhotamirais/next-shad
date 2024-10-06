"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchArticle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      params.set("q", e);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        title="Login dahulu untuk menggunakan fitur search"
        defaultValue={searchParams.get("q")?.toString()}
        placeholder="Search here.."
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
