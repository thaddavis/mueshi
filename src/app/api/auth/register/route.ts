import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/prisma";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();
    const hashedPassword = await hash(password, 10);

    console.log("email", email);
    console.log("password", password);
    console.log("role", role);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: "success" }, { status: 500 });
  }
}
