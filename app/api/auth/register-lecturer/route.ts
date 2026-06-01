// import { NextResponse } from "next/server";
// import { z } from "zod";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// // Notice the new inviteCode requirement
// const registerLecturerSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   email: z.string().email("Valid email required"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   course: z.string().min(2, "Assigned course is required"),
//   inviteCode: z.string().min(1, "Invite code is required"),
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validation = registerLecturerSchema.safeParse(body);

//     if (!validation.success) {
//       return NextResponse.json(
//         { message: "Validation failed", errors: validation.error.flatten().fieldErrors },
//         { status: 400 }
//       );
//     }

//     const { name, email, password, course, inviteCode } = validation.data;

//     // SECURITY CHECK: Verify the invite code against your environment variable
//     if (inviteCode !== process.env.LECTURER_INVITE_TOKEN) {
//       return NextResponse.json(
//         { message: "Unauthorized: Invalid lecturer invite token" },
//         { status: 403 } // 403 Forbidden is the correct HTTP status here
//       );
//     }

//     // Check for existing user
//     const existingAccount = await prisma.user.findUnique({ where: { email } });
//     if (existingAccount) {
//       return NextResponse.json({ message: "Email already exists" }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the User and Lecturer Profile safely
//     const newLecturerAccount = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         role: "LECTURER", // Force the role here so the frontend can't spoof it
//         lecturerProfile: {
//           create: {
//             lecturerName: name,
//             course: course,
//           },
//         },
//       },
//     });

//     return NextResponse.json({ message: "Lecturer created successfully" }, { status: 201 });

//   } catch (error) {
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }