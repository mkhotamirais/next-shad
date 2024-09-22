"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <Card className="m-4 flex flex-col items-center justify-center">
      <CardHeader>
        <div className="flex gap-3 items-center">
          <Button onClick={() => setCount((prev) => prev + 1)}>Plus</Button>
          <div>{count}</div>
          <Button onClick={() => setCount((prev) => prev - 1)}>Minus</Button>
        </div>
        <div className="flex justify-center">
          <Button asChild variant="link">
            <Link href="/theory/layout-vs-template/template">Home</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/theory/layout-vs-template/template/page1">Page1</Link>
          </Button>
        </div>
      </CardHeader>
      <p className="text-center">State pada template akan terpengaruh saat mengganti page</p>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
