import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/(auth)/login/LoginSchema";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await request.json();
  const parsed = schema.safeParse(data);
  
  // 
  if (parsed.success) {
     return NextResponse.json({
      // TODO add user to database
      message: "User Registered!",
      user: parsed.data,
    },
    { status: 200 },
  );
  }


  return NextResponse.json(
    {
      message: "Invalid data",
      errors: parsed.error,
    },
    { status: 400 }
    );
    
}
