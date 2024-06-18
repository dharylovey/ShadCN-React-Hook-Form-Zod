import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/RegisterSChema";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    //TODO: Create User || add to database
    return NextResponse.json({
      message: "User Registered!",
      user: parsed.data,
    });
  }

  return NextResponse.json(
    {
      message: "Invalid data",
      errors: parsed.error,
    },
    { status: 400 }
  );
}
