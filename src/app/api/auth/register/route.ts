import { NextResponse } from "next/server";
import { hash } from "bcrypt";
// import { sql } from '@vercel/postgres';

import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    console.log("hashedPassword", hashedPassword);
    console.log("yup!");

    prisma.user.create({
      data: {
        email,
        // password: hashedPassword,
      },
    });

    // const response = await sql`
    //   INSERT INTO users (email, password)
    //   VALUES (${email}, ${hashedPassword})
    // `;
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
