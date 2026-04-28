import { NextResponse } from "next/server";
import { requireAuth } from "../../backend/middleware/authMiddleware";

export async function GET(request) {
  try {
    const payload = requireAuth(request);
    return NextResponse.json(
      {
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e?.message ?? "Unauthorized" }, { status: e?.status ?? 401 });
  }
}

