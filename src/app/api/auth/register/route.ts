import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/prisma";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: "success" }, { status: 500 });
  }
}
