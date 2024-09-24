"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const existingArticle = await db.article.findUnique({ where: { id } });
    if (!existingArticle) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(existingArticle, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const existingArticle = await db.article.findUnique({ where: { id } });
    if (!existingArticle) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    await db.article.delete({ where: { id } });
    return NextResponse.json({ message: `Delete ${existingArticle.title} success` }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const body = await req.json();
    const existingArticle = await db.article.findUnique({ where: { id } });
    if (!existingArticle) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    await db.article.update({ where: { id }, data: body });
    return NextResponse.json({ message: `Update ${existingArticle.title} success` }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
