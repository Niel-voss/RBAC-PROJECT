import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role; // 'ADMIN' | 'LECTURER' | 'STUDENT'

  // Route definitions
  const isStudentRoute = nextUrl.pathname.startsWith('/student');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLecturerRoute = nextUrl.pathname.startsWith('/lecturer');
  const isProtectedRoute = isStudentRoute || isAdminRoute || isLecturerRoute;

  // 1. AUTHENTICATION REDIRECTS (If not logged in)
  if (!isLoggedIn && isProtectedRoute) {
    // If trying to access Lecturer area, send to lecturer login
    if (isLecturerRoute) {
      return Response.redirect(new URL('/auth/lecturer-login', nextUrl));
    }
    // For everything else (Student/Admin), default to standard login
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  // 2. AUTHORIZATION (If logged in, check if they belong in the current URL)
  if (isLoggedIn && isProtectedRoute) {
    if (isAdminRoute && role !== 'ADMIN') {
      return Response.redirect(new URL('/unauthorized', nextUrl));
    }
    if (isLecturerRoute && role !== 'LECTURER') {
      return Response.redirect(new URL('/unauthorized', nextUrl));
    }
    if (isStudentRoute && role !== 'STUDENT') {
      return Response.redirect(new URL('/unauthorized', nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};