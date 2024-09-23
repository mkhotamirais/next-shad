import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { db } from "./lib/db";
import { compare } from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    Google({
      // clientId: process.env.AUTH_GOOGLE_ID,
      // clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid profile email", // Pastikan `profile` ada untuk gambar profil
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email) return null;
        const user = await db.user.findFirst({ where: { email } });
        if (!user || !user.password) return null;
        const passwordMatch = await compare(password as string, user.password);
        if (!passwordMatch) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
