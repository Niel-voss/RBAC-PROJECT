import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AuditLogClient from "@/components/AuditLogClient";

export default async function AuditLogPage() {
  // 1. Secure the route (Only Admins allowed)
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // 2. Fetch the logs, newest first
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AuditLogClient initialLogs={logs} />
    </div>
  );
}