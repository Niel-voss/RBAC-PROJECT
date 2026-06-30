import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { auth } from "@/auth"; // Ensure this points to your root NextAuth config
import { prisma } from "@/lib/prisma"; // Adjust path if your prisma client is elsewhere

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Get the basic session (which guarantees an email if logged in)

  const session = await auth();


  let displayName = "User";
  let userRole = "student";

  // 2. Query the database using the session email
  if (session?.user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        studentProfile: true,
        lecturerProfile: true,
        adminProfile: true,
      }
    });

    if (dbUser) {
      // Normalize the role for your UI components (e.g., "LECTURER" -> "lecturer")
      userRole = dbUser.role.toLowerCase();

      // 3. Extract the exact name field based on the Prisma schema relations
      if (dbUser.role === "LECTURER" && dbUser.lecturerProfile) {
        displayName = dbUser.lecturerProfile.lecturerName || "Lecturer";
      } else if (dbUser.role === "STUDENT" && dbUser.studentProfile) {
        displayName = dbUser.studentProfile.studentName || "Student";
      } else if (dbUser.role === "ADMIN" && dbUser.adminProfile) {
        displayName = dbUser.adminProfile.adminName || "Admin";
      }
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Pass the real database values down to your LayoutWrapper */}
        <LayoutWrapper
          userName={displayName}
          userRole={userRole}
        >
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}