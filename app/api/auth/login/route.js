import { loginController } from "../../backend/controllers/authController";

export async function POST(request) {
  return loginController(request);
}

