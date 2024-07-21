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

    await prisma.userToGenres.deleteMany({
      where: {
        userId: user?.id,
      },
    });

    const { selectedGenres } = await req.json();

    console.log("selectedGenres", selectedGenres);

    for (let genre of selectedGenres) {
      await prisma.userToGenres.create({
        data: {
          genreId: genre.id,
          userId: user?.id!,
        },
      });
    }

    // console.log("selectedGenres", selectedGenres);

    return NextResponse.json({ message: "genres updated" });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
});

export const GET = auth(async function (req) {
  try {
    console.log("req.auth", req.auth);

    const userGenres = await prisma.userToGenres.findMany({
      where: {
        userId: req.auth?.user.id!,
      },
    });

    return NextResponse.json({ userGenres });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
});
