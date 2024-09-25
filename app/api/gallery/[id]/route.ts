"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const existingGallery = await db.gallery.findUnique({ where: { id } });
    if (!existingGallery) return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    return NextResponse.json(existingGallery, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};

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

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const formData = await req.formData(); // Mengambil data dalam format FormData;

    const name = formData.get("name")?.toString(); // Mendapatkan nama
    const image = formData.get("image") as File | null; // Mendapatkan file gambar

    const existingGallery = await db.gallery.findUnique({ where: { id } });
    if (!existingGallery) return NextResponse.json({ error: "Gallery not found" }, { status: 404 });

    let imagePath;
    if (!image || image.size <= 0) {
      imagePath = existingGallery?.image;
    } else {
      if (existingGallery?.image) {
        await del(existingGallery?.image);
      }
      const blobResponse = await put(image.name, image, { access: "public" });
      imagePath = blobResponse.url;
    }

    const imageUrl = imagePath;

    await db.gallery.update({ where: { id }, data: { name, image: imageUrl } });
    return NextResponse.json({ message: `Update ${existingGallery.name} success` }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
