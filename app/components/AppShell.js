"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import { clearAuthStorage, getAuthToken, isTokenExpired } from "../utils/auth";

const HIDE_HEADER_ROUTES = new Set(["/login", "/signup", "/"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const showHeader = !HIDE_HEADER_ROUTES.has(pathname);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;
    if (isTokenExpired(token)) {
      clearAuthStorage();
      router.replace("/login");
      return;
    }
    let payload = null;
    try {
      const payloadPart = token.split(".")[1];
      if (!payloadPart) return;
      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
      payload = JSON.parse(atob(padded));
    } catch {
      clearAuthStorage();
      router.replace("/login");
      return;
    }
    if (!payload?.exp) return;
    const timeoutMs = payload.exp * 1000 - Date.now();
    if (timeoutMs <= 0) {
      clearAuthStorage();
      router.replace("/login");
      return;
    }
    const timeoutId = setTimeout(() => {
      clearAuthStorage();
      router.replace("/login");
    }, timeoutMs);
    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  return (
    <div className="min-h-screen w-screen bg-slate-200">
      {showHeader ? <Header /> : null}
      <div>{children}</div>
    </div>
  );
}

