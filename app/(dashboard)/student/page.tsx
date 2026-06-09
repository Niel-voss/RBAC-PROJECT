import { redirect } from "next/navigation";
import { auth } from "@/auth"; // Adjust this path if your auth.ts is located somewhere else
import { prisma } from "@/lib/prisma";

import DashboardStats from "@/components/DashboardStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import Schedule from "@/components/Schedule";
import { SidebarProvider } from "@/components/SidebarContext";
import FeePayment from "@/components/FeePayment";

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
    redirect("/auth/login");
  }

  // Safely extract the student profile data
  const student = currentUser.studentProfile;

  return (
    <>
      <SidebarProvider>
        {/* ✨ THE MAGIC WRAPPER ✨ */}
        {/* This flex-col ensures your Banner, Stats, and Bottom Row stack perfectly with a 24px gap (gap-6) */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 lg:p-8">

          {/* ROW 1: Welcome Banner */}
          <WelcomeBanner
            name={student?.studentName || "Student"}
            matricNumber={student?.matriculationNumber || "N/A"}
            department={student?.department || "Unassigned"}
          />

          {/* ROW 2: Stats Cards */}
          <DashboardStats />

          {/* ROW 3: Schedule & Fee Payment */}
          {/* Changed to items-stretch so both columns are forced to the exact same height */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">

            {/* Left Side: Schedule (Takes up more space) */}
            <div className="w-full lg:w-[65%] shrink-0">
              <Schedule />
            </div>

            {/* Right Side: Fee Payment (Sits in the corner) */}
            <div className="w-full lg:w-[35%] shrink-0">
              <FeePayment />
            </div>

          </div>
        </div>
      </SidebarProvider>
    </>
  );
}