import { NextResponse } from "next/server";
import { loginWithEmailPassword } from "../services/authService";

export async function loginController(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  try {
    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) {
      return NextResponse.json({ message: result.error ?? "Login failed" }, { status: 401 });
    }

    return NextResponse.json(
      {
        token: result.token,
        user: result.user,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}

