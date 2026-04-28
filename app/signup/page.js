'use client'
import Image from "next/image";
import Button from "../components/button";
import Input from "../components/input";
import Dropdown from "../components/dropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
      const router = useRouter();
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [phone, setPhone] = useState("");
      const [role, setRole] = useState("");
      const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ];

      function handleSignup(){
        dispatch(signup({name, email, password, phone, role}));
      }

    return (
        
            <div className="relative h-screen w-screen">
                  <Image src="/login img.jpg" alt="login" fill className="object-cover" />
            
                  <div className="absolute inset-0 bg-black/40"></div>
            
                  <div className="absolute inset-0 flex items-center justify-center">
                    {" "}
                    <div className=" p-8 rounded-2xl shadow-lg w-80">
                      <h2 className="text-4xl text-red-100 font-bold mb-8 text-center">Signup</h2>
            
                      <Input
                       placeholder="Name"
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                      />

                      <Input
                       placeholder="Email"
                       type="text"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                      />

                     <Input 
                       placeholder="Phone"
                       type="number"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                      />

                      <Dropdown
                        options={roleOptions}
                        placeholder="Select Role"
                        value={role}
                        onChange={(value) => setRole(value)}
                        className="mb-4"
                      />

                      <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />

            
                      <Button
                      text="Signup"
                      onClick={()=>handleSignup()}
                      />
                    </div>
                  </div>
        </div>
    );
}