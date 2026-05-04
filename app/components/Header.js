"use client";

import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/actions/authAction";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    await dispatch(logout());
    router.replace("/login");
  }



  return (
    <div className="w-full h-16 bg-white border-b border-slate-200">
      <div className="h-full flex items-center gap-4 px-4">
        <Link href="/home" className="text-slate-700 hover:text-slate-900">
          Home
        </Link>
        <Link href="/about" className="text-slate-700 hover:text-slate-900">
          About
        </Link>
        <button
          onClick={handleLogout}
          className="ml-auto rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

