import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // A. Ensure inputs exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // B. Find the user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // C. TYPE GUARD: Ensure user exists AND has a password. 
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // D. Compare passwords securely
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // E. Log them in!
        return {
          id: user.id,
          email: user.email,
          role: user.role, // Essential for your RBAC logic!
        };
      }
    })
  ]
});