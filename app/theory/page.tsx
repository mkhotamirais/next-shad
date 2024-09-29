import { Input } from "@/components/ui/input";
import { navList } from "@/lib/nav-list";
import Link from "next/link";

const subMenuTheory = navList.find((item) => item.label === "Theory")?.subMenu;

export default function TheoryPage() {
  return (
    <div>
      <div className="container">
        <div className="">
          <h1 className="text-lg py-3">Theory Page</h1>
          <Input placeholder="Search here.." />
          <div className="grid grid-cols-2 md:grid-cols-4 py-4 gap-4">
            {subMenuTheory?.map((item, index) => (
              <Link href={item.href} key={index} className="border rounded p-3">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
