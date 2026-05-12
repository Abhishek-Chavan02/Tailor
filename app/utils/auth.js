export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function parseTokenPayload(token) {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) return true;
  const payload = parseTokenPayload(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isLoggedIn() {
  const token = getAuthToken();
  if (!token) return false;
  if (isTokenExpired(token)) {
    clearAuthStorage();
    return false;
  }
  return true;
}

