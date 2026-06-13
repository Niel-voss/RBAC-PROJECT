import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Role } from '@prisma/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. The Iron Gate: Security Check
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Extract the Admin's name for the Audit Log
    const adminName = session.user.name || session.user.email || "System Admin";

    // Protect the Chief Admin from accidentally demoting themselves!
    if (id === session.user.id) {
      return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
    }

    const body = await request.json();
    const { newRole } = body as { newRole: Role };

    // 2. Fetch the current user to see what we are dealing with
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      include: {
        studentProfile: true,
        lecturerProfile: true,
        adminProfile: true,
      }
    });

    if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // --- THE FIX ---
    // Extract the name from their current active profile
    let baseName = "Unknown User";
    if (currentUser.role === Role.STUDENT && currentUser.studentProfile) {
      baseName = currentUser.studentProfile.studentName;
    } else if (currentUser.role === Role.LECTURER && currentUser.lecturerProfile) {
      baseName = currentUser.lecturerProfile.lecturerName;
    } else if (currentUser.role === Role.ADMIN && currentUser.adminProfile) {
      baseName = currentUser.adminProfile.adminName;
    }

    // 3. The Complex Switch (Transactions ensure it all succeeds or all fails)
    await prisma.$transaction(async (tx) => {

      // Step A: Wipe out the old profile cleanly
      if (currentUser.role === Role.STUDENT && currentUser.studentProfile) {
        await tx.student.delete({ where: { userId: id } });
      } else if (currentUser.role === Role.LECTURER && currentUser.lecturerProfile) {
        await tx.lecturer.delete({ where: { userId: id } });
      } else if (currentUser.role === Role.ADMIN && currentUser.adminProfile) {
        await tx.admin.delete({ where: { userId: id } });
      }

      // Step B: Update the base Role and create the new profile using the extracted baseName
      if (newRole === Role.STUDENT) {
        await tx.user.update({
          where: { id: id },
          data: {
            role: Role.STUDENT,
            studentProfile: {
              create: {
                studentName: baseName, // Applied here
                department: "Computer Science",
                matriculationNumber: `MAT-${Date.now()}`
              }
            }
          }
        });
      } else if (newRole === Role.LECTURER) {
        await tx.user.update({
          where: { id: id },
          data: {
            role: Role.LECTURER,
            lecturerProfile: {
              create: {
                lecturerName: baseName, // Applied here
                course: "Computer Science",
              }
            }
          }
        });
      } else if (newRole === Role.ADMIN) {
        await tx.user.update({
          where: { id: id },
          data: {
            role: Role.ADMIN,
            adminProfile: {
              create: {
                adminName: baseName, // Applied here
              }
            }
          }
        });
      }

      // 🚀 THE MISSING PIECE: Step C
      // Log the action INSIDE the transaction so it only saves if everything else succeeds!
      await tx.auditLog.create({
        data: {
          action: "UPDATE_ROLE",
          actor: adminName,
          target: baseName, // The user whose role was changed
          details: `Changed account role from ${currentUser.role} to ${newRole}`,
        }
      });
    });

    // 4. Send success back
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("[ROLE_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}