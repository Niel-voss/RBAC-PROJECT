import { redirect } from "next/navigation";
import { auth } from "@/auth"; // Adjust this path if your auth.ts is located somewhere else
import { prisma } from "@/lib/prisma";

import DashboardStats from "@/components/DashboardStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import Schedule from "@/components/Schedule";
import { SidebarProvider } from "@/components/SidebarContext";

export default async function Home() {
  // 1. Get the current logged-in session
  const session = await auth();

  // 2. If they aren't logged in, instantly kick them to the login page
  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  // 3. Fetch their full profile from the database
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      studentProfile: true, // This brings in the name, matric number, and department
    },
  });

  // 4. RBAC Check: Ensure this person is actually a student
  // (Prevents an Admin or Lecturer from trying to load the student dashboard)
  if (!currentUser || currentUser.role !== "STUDENT") {
    redirect("/login");
  }

  // Safely extract the student profile data
  const student = currentUser.studentProfile;

  return (
    <>
      <SidebarProvider>
        {/* 5. Pass the dynamic database values directly into your banner */}
        <WelcomeBanner
          name={student?.studentName || "Student"}
          matricNumber={student?.matriculationNumber || "N/A"}
          department={student?.department || "Unassigned"}
        />

        {/* Your other components remain completely untouched! */}
        <DashboardStats />
        <Schedule />
      </SidebarProvider>
    </>
  );
}