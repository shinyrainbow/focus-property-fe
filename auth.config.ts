import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // maxAge: 5,
  },
  providers: [
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signup",
  },
} satisfies NextAuthConfig;
