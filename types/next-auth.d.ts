import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // 1. Import the official Prisma Role

declare module "next-auth" {
  /**
   * Returned by `auth()`, `useSession()`, `getSession()`
   */
  interface Session {
    user: {
      role: Role; // 2. Map to Prisma's Role
    } & DefaultSession["user"]
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    role: Role; // 3. Map to Prisma's Role
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: Role; // 4. Map to Prisma's Role for the token
  }
}