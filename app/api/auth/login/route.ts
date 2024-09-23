"use server";

import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await db.user.findFirst({ where: { email } });
    // console.log(user);
    if (!user || !user.password) return NextResponse.json({ error: `Email is incorrect` }, { status: 400 });

    const passwordMatch = await compare(password, user?.password as string);
    if (!passwordMatch) return NextResponse.json({ error: `Email or password is incorrect` }, { status: 400 });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: "/dashboard",
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return NextResponse.json({ message: `Login ${body.email} success!` }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
