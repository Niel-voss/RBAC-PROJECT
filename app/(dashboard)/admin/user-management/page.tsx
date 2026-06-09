import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserManagementClient from "./UserManagementClient";

export default async function AdminUserManagementPage() {
  // 1. Secure the route
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // 2. Fetch users AND include their specific profile relations
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      studentProfile: true,
      lecturerProfile: true,
      adminProfile: true,
    }
  });

  // 3. Intelligently format the data based on the user's role
  const formattedUsers = users.map((user) => {
    let displayName = "Unknown User";
    let dept = "General";

    // Extract the exact name based on which profile they have
    if (user.role === "STUDENT" && user.studentProfile) {
      displayName = user.studentProfile.studentName;
      dept = user.studentProfile.department;
    } else if (user.role === "LECTURER" && user.lecturerProfile) {
      displayName = user.lecturerProfile.lecturerName;
      dept = user.lecturerProfile.course || "Faculty";
    } else if (user.role === "ADMIN" && user.adminProfile) {
      displayName = user.adminProfile.adminName;
      dept = "Administration";
    }

    return {
      id: user.id,
      name: displayName,
      email: user.email,
      role: user.role,
      department: dept,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <UserManagementClient initialUsers={formattedUsers} />
    </div>
  );
}