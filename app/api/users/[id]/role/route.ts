import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust this path if your prisma export is elsewhere
import { auth } from '@/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. The Iron Gate: Ensure the person making the request is an ADMIN
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // 2. Grab the new role sent from your frontend React component
    const body = await request.json();
    const { newRole } = body;

    // 3. Update the specific user in the database
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { role: newRole },
    });

    // 4. Send success back to the frontend
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error("[ROLE_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}