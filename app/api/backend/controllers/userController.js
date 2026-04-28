import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../services/userService";

export async function createUserController(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name : "";
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const result = await createUser({ name, email, password });
  if (!result.ok) {
    return NextResponse.json({ message: result.error ?? "Failed" }, { status: 400 });
  }

  return NextResponse.json({ user: result.user }, { status: 201 });
}


export async function findUserByEmailController(request) {
  let email;
  
  if (request.url) {
    const { searchParams } = new URL(request.url);
    email = searchParams.get('email');
  } else if (request.email) {
    email = request.email;
  }
  
  if (!email) {
    return NextResponse.json({ message: "Email parameter is required" }, { status: 400 });
  }
  
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  
  return NextResponse.json({ user }, { status: 200 });
}
