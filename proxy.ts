// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // 1. Grab the session token from the cookies.
//   // Note: Adjust the cookie name if your custom auth uses a different key!
//   const sessionToken = request.cookies.get('session-token')?.value || request.cookies.get('next-auth.session-token')?.value;

//   // 2. Get the current URL path the user is trying to visit
//   const { pathname } = request.nextUrl;

//   // 3. The Security Check
//   // If there is NO token AND they are trying to access ANY student route...
//   if (!sessionToken && pathname.startsWith('/student')) {
//     // ...bounce them immediately to your login page.
//     return NextResponse.redirect(new URL('/auth/login', request.url));
//   }

//   // 4. If they have a token (or aren't visiting a protected route), let them through.
//   return NextResponse.next();
// }

// // 5. The Matcher (Crucial for performance)
// // This tells Next.js to ONLY run this middleware on specific routes.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths starting with /student
//      */
//     '/student/:path*',
//   ],
// };

import NextAuth from "next-auth";
// Adjust this path to point to wherever your auth.config.ts file is located
import { authConfig } from "./auth.config";

// Initialize NextAuth with your edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth is automatically populated by Auth.js if a valid cookie exists
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl; 1

  // The Security Check
  if (!isLoggedIn && pathname.startsWith('/student')) {
    return Response.redirect(new URL('/auth/login', req.nextUrl));
  }
});

// The Matcher tells Next.js to ONLY run this middleware on specific routes
export const config = {
  matcher: ['/student/:path*'],
};