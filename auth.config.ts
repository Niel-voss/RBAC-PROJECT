import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/prisma";
export const authConfig = {
  session: {
    strategy: "jwt", // stores user session in cookie rather than the database
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      // The 'user' object is only passed in the first time the user logs in.
      // We grab the role from it and attach it to the JWT token.
      if (user) {
        token.id = user.id;
        // token.name = user.name; // (See important note below!)
        token.role = user.role;    // <-- ADDED THIS
      }
      return token;
    },

    async session({ session, token }) {
      // Every time the app checks the session, we take the role from the token
      // and attach it to the session object so your frontend can read it.
      if (session.user) {
        session.user.id = token.id as string;
        // session.user.name = token.name as string; 
        session.user.role = token.role as "ADMIN" | "STUDENT" | "LECTURER"; // <-- ADDED THIS
      }
      return session;
    },
  }
} satisfies NextAuthConfig;

// auth.ts pulls the role from the database.

// The jwt callback securely packs the role into the user's browser.

// The session callback unpacks it so your layout banners, API routes, and dashboard pages can read session.user.role to know exactly who is browsing the app.