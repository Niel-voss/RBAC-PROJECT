import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LecturerDashboardClient from "./lecturerDashboardClient";

export default async function LecturerDashboardPage() {
  const session = await auth();

  // 1. Explicitly check for the email string
  const userEmail = session?.user?.email;

  // 2. If no email, redirect immediately and stop execution
  if (!userEmail) {
    redirect("/auth/login-lecturer");
  }

  // 3. Force the query to use the guaranteed string
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail as string
    },
    select: {
      id: true,
      lecturerProfile: {
        select: {
          lecturerName: true,
        },
      },
    }
  });

  // 4. If the user somehow passed auth but isn't in the DB, handle gracefully
  if (!user) {
    // You could redirect to a 404 or a "User not found" page
    redirect("/auth/login-lecturer");
  }

  const studentCount = await prisma.user.count({
    where: { role: "STUDENT" },
  });

  const lecturerName =
    user?.lecturerProfile?.lecturerName || "Lecturer";
  return (
    <LecturerDashboardClient
      name={lecturerName}
      lecturerId={user.id}
      studentCount={studentCount.toString()}
    />
  );
}