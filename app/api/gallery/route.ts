"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData(); // Mengambil data dalam format FormData;

    const name = formData.get("name")?.toString(); // Mendapatkan nama
    const image = formData.get("image") as File | null; // Mendapatkan file gambar

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!image) return NextResponse.json({ error: "Image is required" }, { status: 400 });

    const existingGallery = await db.gallery.findFirst({ where: { name } });
    if (existingGallery) return NextResponse.json({ error: "Gallery already exists" }, { status: 409 });

    const blobResponse = await put(image.name, image, { access: "public" });
    const imageUrl = blobResponse.url;

    await db.gallery.create({ data: { name, image: imageUrl } });
    return NextResponse.json({ message: `Create ${name} success` }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
};
