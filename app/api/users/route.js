import { NextResponse } from "next/server";
import { createUserController, findUserByEmailController } from "../backend/controllers/userController";

export async function POST(request) {
  try {
    const { action, ...data } = await request.json();
    
    switch (action) {
      case "create":
        return createUserController({ ...data });
      case "find":
        return findUserByEmailController({ ...data });
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  switch (action) {
    case "find":
      return findUserByEmailController(request);
    case "all":
      return NextResponse.json({ message: "Get all users - not implemented yet" }, { status: 501 });
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}


