"use server";

// 1. Corrected import: Pointing to your singleton Prisma client in the lib folder
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 2. Define the exact shape of the incoming form data
interface RegisterFormData {
  name: string;
  email: string;
  matricNumber: string;
  password: string;
}

// 3. Replace 'any' with the new interface
export async function registerStudent(formData: RegisterFormData) {
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
              matriculationNumber: matricNumber // Maps to the variable passed into your function
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
        // 1. Base User Auth Fields
        email,
        password: hashedPassword,
        role: "STUDENT", // (Optional if your schema default handles this)

        // 2. Nested write to create the connected Student profile
        studentProfile: {
          create: {
            studentName: name,
            matriculationNumber: matricNumber, // <-- Make sure this matches the schema spelling!
            department: "Computer Science"     // <-- IMPORTANT: Your schema requires a department!
          }
        }
      }
    });

    return { success: true };

    // 4. Replace 'any' with 'unknown' for strict type safety in the catch block
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred while creating the account." };
  }
}