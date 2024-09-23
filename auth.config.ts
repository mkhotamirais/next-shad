import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid profile email", // Pastikan `profile` ada untuk gambar profil
        },
      },
    }),
  ],
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production", // Aktifkan hanya di production
  //     },
  //   },
  // },
  // jwt: {secret},
  // secret: process.env.AUTH_SECRET, // Pastikan ini diatur dengan benar
  // debug: process.env.NODE_ENV === "development",
  // jwt: {secret: process.env.AUTH_SECRET as string},
  // callbacks: {
  //   async signIn() {
  //     // Ini bisa dipakai untuk memeriksa apakah proses login berhasil
  //     return true;
  //   },
  //   async jwt({ token, account }) {
  //     // Token disimpan setelah login
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   // async session({ session, token }) {
  //   //   // Token diproses ke session
  //   //   session.accessToken = token.accessToken;
  //   //   return session;
  //   // },
  // },
  // secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
