"use server";

import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password, confPassword } = body;

    if (password !== confPassword) return NextResponse.json({ error: `Password not match` }, { status: 400 });

    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);

    const existingUser = await db.user.findFirst({ where: { email } });
    if (existingUser) return NextResponse.json({ error: `Email already exists` }, { status: 409 });

    let data: { email: string; password: string; role?: UserRole } = { email, password: hashPass };
    if (email === "ahmad@gmail.com") data = { ...data, role: UserRole.ADMIN };

    await db.user.create({ data });

    return NextResponse.json({ message: `Register ${body.email} success!` }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
