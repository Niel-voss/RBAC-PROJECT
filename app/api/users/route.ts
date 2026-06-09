import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    // 1. Fetch users AND their attached profiles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        // Grab the profiles so we can extract names and departments
        studentProfile: true,
        lecturerProfile: true,
        adminProfile: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    // 2. Flatten the data so your frontend table gets a clean object
    const formattedUsers = users.map(user => {
      let name = "Unknown";
      let department = "N/A";

      if (user.role === 'STUDENT' && user.studentProfile) {
        name = user.studentProfile.studentName;
        department = user.studentProfile.department;
      } else if (user.role === 'LECTURER' && user.lecturerProfile) {
        name = user.lecturerProfile.lecturerName;
        department = user.lecturerProfile.course; // Using course as department for lecturers
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

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const body = await request.json();
    // Use generic 'name' from the frontend form, and specific fields
    const { name, email, role, department, matriculationNumber, course, password } = body;

    // TODO: Hash your password! (e.g., const hashedPassword = await bcrypt.hash(password, 10))
    const hashedPassword = password; // Temporary until you add bcrypt

    let newUser;

    // Dynamically create the right profile based on the role selected
    switch (role) {
      case 'STUDENT':
        newUser = await prisma.user.create({
          data: {
            email,
            role,
            password: hashedPassword,
            studentProfile: {
              create: {
                studentName: name,
                department: department || "Unassigned",
                matriculationNumber: matriculationNumber || `MAT-${Date.now()}`,
              }
            }
          }
        });
        break;

      case 'LECTURER':
        newUser = await prisma.user.create({
          data: {
            email,
            role,
            password: hashedPassword,
            lecturerProfile: {
              create: {
                lecturerName: name,
                course: course || department || "Unassigned",
              }
            }
          }
        });
        break;

      case 'ADMIN':
        newUser = await prisma.user.create({
          data: {
            email,
            role,
            password: hashedPassword,
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