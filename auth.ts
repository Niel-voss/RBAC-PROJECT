import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

//console.log("DB URL being used:", process.env.DATABASE_URL);
export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  // 🚀 ADD THIS EVENTS BLOCK:
  events: {
    async signIn({ user }) {
      // This runs automatically in the background every time ANY user logs in successfully
      try {
        await prisma.auditLog.create({
          data: {
            action: "USER_LOGIN",
            actor: user.name || user.email || "Unknown User",
            target: "System Authentication",
            details: `Logged into the system successfully.`,
          },
        });
      } catch (error) {
        console.error("Failed to log sign-in event:", error);
      }
    },
  },
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

        // 🚀 D. THE DEFENSE DAY BYPASS 🚀
        // This MUST happen before bcrypt so we don't crash on plain text passwords!
        if (credentials.email === 'admin@oluku.edu.ng' && credentials.password === 'adminpassword123') {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        }

        // E. Compare passwords securely for EVERYONE ELSE
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // F. Log normal users in!
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      }
    })
  ]
});