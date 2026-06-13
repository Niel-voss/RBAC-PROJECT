"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth"; // <-- Add this import for RBAC checks!
import { revalidatePath } from "next/cache"; // <-- Add this to refresh the page after updating


// ==========================================
// 1. YOUR EXISTING ADMIN REGISTER FUNCTION
// ==========================================
interface RegisterFormData {
  name: string;
  email: string;
  matricNumber: string;
  password: string;
}

export async function registerStudent(formData: RegisterFormData) {

  const session = await auth();
  const actorName = session?.user?.name || session?.user?.email || "System Lecturer";
  const { name, email, matricNumber, password } = formData;

  if (!email || !password || !matricNumber || !name) {
    throw new Error("All fields are required.");
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          {
            studentProfile: {
              matriculationNumber: matricNumber
            }
          }
        ]
      },
    });

    if (existingUser) {
      throw new Error("A user with this email or Matriculation Number already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT",
        studentProfile: {
          create: {
            studentName: name,
            matriculationNumber: matricNumber,
            department: "Computer Science"
          }
        }
      }
    });
    await prisma.auditLog.create({
      data: {
        action: "CREATE_USER",
        actor: actorName,
        target: `Student: ${name} (${matricNumber})`,
        details: `Created a new student account with email ${email}`,
      }
    });

    return { success: true };

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred while creating the account." };
  }
}

// ==========================================
// 2. THE NEW LECTURER CGPA FUNCTION
// ==========================================
export async function updateStudentCgpa(studentProfileId: string, newCgpa: number) {
  // 1. Get the current user making the request
  const session = await auth();
  const actorName = session?.user?.name || session?.user?.email || "System Lecturer";

  // 2. STRICT RBAC CHECK: Only LECTURER (or ADMIN) can execute this function.
  if (!session?.user || (session.user.role !== "LECTURER" && session.user.role !== "ADMIN")) {
    return { success: false, error: "403 Forbidden: You do not have permission to update academic records." };
  }

  // 3. Update the database
  try {
    // We update the StudentProfile table directly
    await prisma.student.update({
      where: { id: studentProfileId }, // Ensure your modal passes the StudentProfile ID here
      data: { cgpa: newCgpa },
    });
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_CGPA",
        actor: actorName,
        target: `Student ID: ${studentProfileId}`,
        details: `Updated CGPA to ${newCgpa.toFixed(2)}`,
      }
    });

    // 4. Force Next.js to refresh the UI instantly
    // Refresh the Lecturer page so they see the success
    revalidatePath("/lecturer");
    // Refresh the Student page so their dashboard updates
    revalidatePath("/student");

    return { success: true };
  } catch (error) {
    console.error("Database update failed:", error);
    return { success: false, error: "Failed to update CGPA in the database." };
  }
}