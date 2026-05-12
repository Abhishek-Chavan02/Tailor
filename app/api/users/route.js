import { NextResponse } from "next/server";
import { createUserController, deleteUserController, findUserByEmailController, getAllUsersController, updateUserController } from "../backend/controllers/userController";
import { requireAuth } from "../backend/middleware/authMiddleware";

export async function POST(request) {
  try {
    const { action, ...data } = await request.json();
    if (action !== "create" && action !== "find") {
      requireAuth(request);
    }
    
    switch (action) {
      case "create":
        return createUserController({ ...data });
      case "find":
        return findUserByEmailController({ ...data });
      case 'getAllUsers':
        return getAllUsersController({...data});  
      case 'update':
        return updateUserController({...data});
      case 'delete':
        return deleteUserController({...data});
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message ?? "Unauthorized" }, { status: error?.status ?? 400 });
  }
}


