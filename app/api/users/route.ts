import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

// ==========================================
// GET: Fetch all users for the Admin Table
// ==========================================
export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        studentProfile: true,
        lecturerProfile: true,
        adminProfile: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedUsers = users.map(user => {
      let name = "Unknown";
      let department = "N/A";

      if (user.role === 'STUDENT' && user.studentProfile) {
        name = user.studentProfile.studentName;
        department = user.studentProfile.department;
      } else if (user.role === 'LECTURER' && user.lecturerProfile) {
        name = user.lecturerProfile.lecturerName;
        department = user.lecturerProfile.course || "Unassigned";
      } else if (user.role === 'ADMIN' && user.adminProfile) {
        name = user.adminProfile.adminName;
        department = "Administration";
      }

      return {
        id: user.id,
        name,
        email: user.email,
        role: user.role,
        department,
      };
    });

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("[GET_USERS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ==========================================
// POST: Securely Create a New User
// ==========================================
export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, role, department, password } = body;

    // 1. Check if user already exists to prevent DB crashes
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // 2. Hash the password securely!
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    // 3. Dynamically create the right profile using Prisma Enums
    switch (role) {
      case 'STUDENT':
        newUser = await prisma.user.create({
          data: {
            email,
            role: Role.STUDENT,
            password: hashedPassword,
            isVerified: true, // Let them log in immediately
            studentProfile: {
              create: {
                studentName: name,
                department: department || "Unassigned",
                matriculationNumber: `MAT-${Date.now()}`,
              }
            }
          }
        });
        break;

      case 'LECTURER':
        newUser = await prisma.user.create({
          data: {
            email,
            role: Role.LECTURER,
            password: hashedPassword,
            isVerified: true,
            lecturerProfile: {
              create: {
                lecturerName: name,
                course: department || "Unassigned",
              }
            }
          }
        });
        break;

      case 'ADMIN':
        newUser = await prisma.user.create({
          data: {
            email,
            role: Role.ADMIN,
            password: hashedPassword,
            isVerified: true,
            adminProfile: {
              create: {
                adminName: name,
              }
            }
          }
        });
        break;

      default:
        return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("[CREATE_USER_ERROR]", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}