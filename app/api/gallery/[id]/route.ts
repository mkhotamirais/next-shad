"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const existingGallery = await db.gallery.findUnique({ where: { id } });
    if (!existingGallery) return NextResponse.json({ error: "Gallery not found" }, { status: 404 });

    if (existingGallery.image) {
      await del(existingGallery.image);
    }

    await db.gallery.delete({ where: { id } });
    return NextResponse.json({ message: `Delete ${existingGallery.name} success` }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
