import type { NextAuthConfig } from "next-auth";

export const authConfig = {

  session: {
    strategy: "jwt", //stores user session in cookie rather than the database
  },

  //secret : process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    // Optional: You can add an 'authorized' callback here later to protect routes in middleware
  }
} satisfies NextAuthConfig;