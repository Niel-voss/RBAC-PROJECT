import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client"; // 🚀 1. Import the official Prisma Enum
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  // Secure the route
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // 🚀 2. Use the exact Enum object instead of raw text strings
  const [studentCount, lecturerCount, adminCount] = await Promise.all([
    prisma.user.count({ where: { role: Role.STUDENT } }),
    prisma.user.count({ where: { role: Role.LECTURER } }),
    prisma.user.count({ where: { role: Role.ADMIN } }),
  ]);

  return (
    <AdminDashboardClient
      studentCount={studentCount}
      lecturerCount={lecturerCount}
      adminCount={adminCount}
    />
  );
}