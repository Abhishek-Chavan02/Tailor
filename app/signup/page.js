"use client";
import Image from "next/image";
import Button from "../components/button";
import Input from "../components/input";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { signup } from "../redux/actions/authAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Link from "next/link";
import { isLoggedIn } from "../utils/auth";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [canRender, setCanRender] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const{signupInfo, loading, error} = useAppSelector((state) => state.userLogin);
  

  useLayoutEffect(() => {
    if (isLoggedIn()) {
      router.replace("/home");
      return;
    }
    setCanRender(true);
  }, [router]);

  function handleSignup() {
    dispatch(signup({ name, lastName, email, password, phone, role }));
    router.push("/");
  }

  if (!canRender) return null;

  return (
    <div className="relative h-screen w-screen">
      <Image src="/login img.jpg" alt="login" fill className="object-cover" />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        {" "}
        <div className=" p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-4xl text-red-100 font-bold mb-8 text-center">
            Signup
          </h2>

          <Input
            placeholder="First Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button text="Signup" onClick={() => handleSignup()} />

          <p className="text-center mt-4 text-red-100">
            Don't have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
