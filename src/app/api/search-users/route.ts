import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = auth(async function (req) {
  try {
    console.log("req.auth", req.auth);

    const userResults = await prisma.user.findMany({
      where: {
        NOT: {
          email: req.auth?.user.email!,
        },
      },
      include: {
        userToInterests: {
          select: {
            interest: true,
          },
        },
        userToGenres: {
          select: {
            genre: true,
          },
        },
      },
    });

    return NextResponse.json({ userResults });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
});
