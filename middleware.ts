import NextAuth from "next-auth";
// Adjust this path to point to wherever your auth.config.ts file is located
import { authConfig } from "./auth.config";

// Initialize NextAuth with your edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth is automatically populated by Auth.js if a valid cookie exists
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role; // Safely grab the role we injected earlier
  const { pathname } = req.nextUrl;

  // Define your protected areas
  const isStudentRoute = pathname.startsWith('/student');
  const isAdminRoute = pathname.startsWith('/admin');

  // 1. MUST BE LOGGED IN: If they aren't logged in and try to hit ANY protected route
  if (!isLoggedIn && (isStudentRoute || isAdminRoute)) {
    return Response.redirect(new URL('/auth/login', req.nextUrl));
  }

  // 2. THE IRON GATE: If they ARE logged in, but a non-admin tries to sneak into /admin
  if (isAdminRoute && role !== 'ADMIN') {
    // Bounce them back to the student area
    return Response.redirect(new URL('/student', req.nextUrl));
  }

  // If they pass the checks, let them through to the page
});

// The Matcher tells Next.js where to run this. 
// This specific regex tells it to run on EVERY route EXCEPT static files, images, and API routes.
// This is much safer than manually listing every single protected route.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};