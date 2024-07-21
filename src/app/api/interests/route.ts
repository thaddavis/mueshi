import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    return NextResponse.json({ message: "interests updated" });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
