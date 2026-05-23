"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/actions/authAction";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(null);
  

  async function handleLogout() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      await dispatch(logout());

      Swal.fire({
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    }
  }

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  return (
    <div className="w-full h-16 bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="h-full flex items-center gap-6 px-4">
        <Link
          href="/home"
          className="text-slate-700 hover:text-blue-600 text-lg font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
        >
          Home
        </Link>
       { user?.role === "admin" && (
          <Link
            href="/list"
            className="text-slate-700 hover:text-blue-600 text-lg font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            List
          </Link>
        )}
        <Link
          href="/about"
          className="text-slate-700 hover:text-blue-600 text-lg font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
        >
          About
        </Link>
        <h1 className="text-4xl font-serif text-center ml-50 font-bold text-white bg-black py-2 rounded-xl shadow-2xl border-2 tracking-[8px] uppercase">
          ✂️ Vishal Tailor's ✂️
        </h1>
        <button
          onClick={handleLogout}
          className="ml-auto mr-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
