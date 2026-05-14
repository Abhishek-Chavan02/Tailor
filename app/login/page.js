"use client";

import Image from "next/image";
import Input from "../components/input";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/actions/authAction";
import Link from "next/link";
import { isLoggedIn } from "../utils/auth";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userInfo, loading } = useAppSelector((state) => state.userLogin);
  console.log("loading: ", loading);
  const [canRender, setCanRender] = useState(false);
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading == true) {
    Swal.fire({
      title: "Success!",
      text: "Login successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
  useLayoutEffect(() => {
    if (isLoggedIn()) {
      router.replace("/home");
      return;
    }
    if (userInfo) {
      router.replace("/home");
      return;
    }
    setCanRender(true);
  }, [userInfo, router]);

  if (!canRender) return null;

  function handleLogin() {
    const emailTrimmed = email.trim();
    if (!emailTrimmed || !password) {
      setFormError("Email and password are required");
      return;
    }
    setFormError("");
    dispatch(login({ email, password }));
  }

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image src="/login img.jpg" alt="login" fill className="object-cover" />

      {/* Overlay (optional dark effect) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {" "}
        <div className=" p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-4xl text-red-100 font-bold mb-8 text-center">
            Login
          </h2>

          <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {formError ? (
            <p className="text-center text-red-200 text-sm -mt-6 mb-6">
              {formError}
            </p>
          ) : null}
          <Button text="Login" onClick={() => handleLogin()} />

          <p className="text-center mt-4 text-red-100">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
