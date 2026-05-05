import { NextResponse } from "next/server";
import { createUserController, deleteUserController, findUserByEmailController, getAllUsersController, updateUserController } from "../backend/controllers/userController";

export async function POST(request) {
  try {
    const { action, ...data } = await request.json();
    
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
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}


