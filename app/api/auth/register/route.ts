import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// 1. Updated Schema: Exactly matches your frontend form state
const registerStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  matricNumber: z.string().min(5, "Please provide a valid matriculation number"), // Matches page.tsx!
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Parse and validate the inputs
    const validation = registerStudentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed - please check your input",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Extract matricNumber (frontend name) along with the rest
    const { name, email, password, matricNumber } = validation.data;

    // 3. Verify uniqueness
    const existingAccount = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAccount) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const existingMatric = await prisma.student.findUnique({
      where: { matriculationNumber: matricNumber }, // Map to Prisma's exact column name
    });

    if (existingMatric) {
      return NextResponse.json(
        { message: "A student with this matriculation number already exists" },
        { status: 409 }
      );
    }

    // 4. Hash password safely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user and student profile
    const newStudentAccount = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT",
        studentProfile: {
          create: {
            studentName: name,
            matriculationNumber: matricNumber, // Map to Prisma's exact column name
            department: "Unassigned",
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });

    return NextResponse.json(
      {
        message: "Student account created successfully",
        user: {
          id: newStudentAccount.id,
          email: newStudentAccount.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { message: "Something went wrong creating the account" },
      { status: 500 }
    );
  }
}