import { verifyAuthToken } from "../services/authService";

export function getBearerToken(request) {
  const header =  request.headers.get("Authorization");
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}

export function requireAuth(request) {
  const token = getBearerToken(request);
  if (!token) {
    const err = new Error("Missing bearer token");
    err.status = 401;
    throw err;
  }
  try {
    return verifyAuthToken(token);
  } catch {
    const err = new Error("Invalid token");
    err.status = 401;
    throw err;
  }
}

