"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const HIDE_HEADER_ROUTES = new Set(["/login", "/signup", "/"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const showHeader = !HIDE_HEADER_ROUTES.has(pathname);

  return (
    <div className="min-h-screen w-screen bg-slate-200">
      {showHeader ? <Header /> : null}
      <div>{children}</div>
    </div>
  );
}

