import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env, assertAuthEnvConfigured } from "../env/env";
import { findUserByEmail } from "./userService";

export async function loginWithEmailPassword({ email, password }) {
  assertAuthEnvConfigured();

  if (!email || !password) return { ok: false, error: "Email and password required" };

  const userDoc = await findUserByEmail(email);
  if (!userDoc) return { ok: false, error: "Invalid credentials" };

  const passwordOk = await bcrypt.compare(password, userDoc.passwordHash);
  if (!passwordOk) return { ok: false, error: "Invalid credentials" };

  const user = {
    id: userDoc._id?.toString?.() ?? String(userDoc._id),
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role ?? "user",
  };

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, name: user.name },
    env.jwtSecret,
    { expiresIn: "1h" }
  );

  return { ok: true, user, token };
}

export function verifyAuthToken(token) {
  assertAuthEnvConfigured();
  return jwt.verify(token, env.jwtSecret);
}

