import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    // error: "/error",
  },

  events: {
    async linkAccount({ user, account }) {
      await db.user.update({ where: { id: user.id }, data: { provider: account?.provider, lastLogin: new Date() } });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await db.user.findFirst({ where: { email: user.email } });

      if (existingUser) {
        await db.user.update({
          where: { id: existingUser?.id },
          data: { provider: account?.provider, lastLogin: new Date() },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await db.user.findUnique({ where: { id: token.sub } });

      if (!existingUser) return token;
      token.name = existingUser.name;
      token.eamil = existingUser.email;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
