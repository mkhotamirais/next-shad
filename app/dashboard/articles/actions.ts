"use server";

import { db } from "@/lib/db";

export const getArticles = async () => {
  try {
    const data = await db.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data;
  } catch (error) {
    console.log(error);
    //   if (error instanceof Error) {
    //     return NextResponse.json({ error: error.message }, { status: 400 });
    //   } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
