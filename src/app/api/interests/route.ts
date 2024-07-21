import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const POST = auth(async function (req) {
  try {
    console.log("req.auth", req.auth);

    const user = await prisma.user.findUnique({
      where: {
        email: req.auth?.user.email!,
      },
    });

    console.log("user.id", user?.id);

    await prisma.userToInterests.deleteMany({
      where: {
        userId: user?.id,
      },
    });

    const { selectedInterests } = await req.json();

    console.log("selectedInterests", selectedInterests);

    for (let interest of selectedInterests) {
      await prisma.userToInterests.create({
        data: {
          interestId: interest.id,
          userId: user?.id!,
        },
      });
    }

    return NextResponse.json({ message: "interests updated" });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
});

export const GET = auth(async function (req) {
  try {
    console.log("req.auth", req.auth);

    const userInterests = await prisma.userToInterests.findMany({
      where: {
        userId: req.auth?.user.id!,
      },
    });

    return NextResponse.json({ userInterests });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
});
