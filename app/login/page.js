'use client'

import Image from "next/image";
import Input from "../components/input";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setCredentials } from "../redux/reducers/authReducer";
import { login } from "../redux/actions/loginAction";

export default function Login() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(){
    dispatch(login({email, password}));
    router.push("/home");
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
          <h2 className="text-4xl text-red-100 font-bold mb-8 text-center">Login</h2>


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



          <Button
          text="Login"
          onClick={()=>handleLogin()}
          />
        </div>
      </div>
    </div>
  );
}
