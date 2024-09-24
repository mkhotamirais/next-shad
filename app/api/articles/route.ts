"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   try {
//     const data = await db.article.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     console.log(data);
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// };

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { title, content } = body;

    const existingArticle = await db.article.findFirst({ where: { title } });
    if (existingArticle) return NextResponse.json({ error: "Article already exists" }, { status: 409 });

    await db.article.create({ data: { title, content } });
    return NextResponse.json({ message: `Create ${title} success` }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
